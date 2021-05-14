import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountService) { }

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
      resData => {
        console.log(resData)
        this.accountService.toggleModal(true, 'log in')
        form.reset();
      },
      error => {
        if(error?.error?.error?.message){
          this.accountService.message.next({message: error?.error?.error?.message.replace(/_/g, " "), error: true})
        }
        else{
          this.accountService.message.next({message: 'something went wrong, Check your connection', error: true})
        }
      }
    );
  }

  onCancelModal(){
    this.accountService.toggleModal(false, '')
    this.registerForm.reset();
  }

}
