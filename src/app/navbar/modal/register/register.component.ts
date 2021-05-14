import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account.service';
import { BalanceService } from 'src/app/shared/services/balance.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private balanceService: BalanceService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  @ViewChild('registerForm') registerForm: NgForm; 

  showModal: boolean;
  showStatuses = false;

  onRegister(form: NgForm){

    if(!form.valid){
      this.showStatuses = true;
      return;
    }

    const email = form.value.email;
    const password = form.value.password1;

    this.accountService.signup(email, password).subscribe(
      () => {
        this.balanceService.addBalanceInDB(email, 10).subscribe(()=>{
        }, () => {
          this.messageService.message.next({message: 'something went wrong, Check your connection', error: true})
        })
        
        this.accountService.toggleModal(true, 'log in')
        form.reset();
      },
      error => {
        if(error?.error?.error?.message){
          this.messageService.message.next({message: error?.error?.error?.message.replace(/_/g, " "), error: true})
        }
        else{
          this.messageService.message.next({message: 'something went wrong, Check your connection', error: true})
        }
      }
    );
  }

  onCancelModal(){
    this.accountService.toggleModal(false, '')
    this.registerForm.reset();
  }

}
