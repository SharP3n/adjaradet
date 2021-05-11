import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';

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

  onRegister(form){

    // if(!form.valid || form.value.password1 !== form.value.password2){
    //   return;
    // }    
    const email = form.value.email;
    const password = form.value.password1;

    this.accountService.signup(email, password).subscribe(//only used for error
      resData => {
        console.log(resData)
        this.accountService.toggleModal(true, 'log in')//to log-in
        form.reset();
      },
      error => {
        if(error?.error?.error?.message){
          this.accountService.message.emit({message: error?.error?.error?.message.replace(/_/g, " "), error: true})
        }
        else{
          this.accountService.message.emit({message: 'something went wrong, Check your connection', error: true})
        }
        // console.log(error);
        // switch(error.error.error){
        //   case 'EMAIL_EXISTS': 
        //   //error = 'this email already exists'
        // }
      }
    );
  }

  onCancelModal(){
    this.accountService.toggleModal(false, '')
    this.registerForm.reset();
  }

}
