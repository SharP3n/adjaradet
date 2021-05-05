import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.displayModal.subscribe((modalInfo: {displayModal: boolean, action: string}) => {
      this.action = modalInfo.action;
      this.display = modalInfo.displayModal;
    })

    // this.accountService.fetchAccounts().subscribe(accounts => {
    //   this.accountService.accountsArr = accounts;
    // }
    // ,() => {
    //   this.accountService.message.emit('Error Occurred, Check Network Connection')//customize errors
    // });
  }

  @ViewChild('logInForm') logInForm: NgForm; 
  @ViewChild('registerForm') registerForm: NgForm; 

  action: string;
  display: boolean;

  onCancelModal(state){
    this.display = false;
    if(state === 'log in'){
      this.logInForm.reset();
    }
    else if(state === 'register'){
      this.registerForm.reset();
    }
  }

  inputMessage: string;

  onLogin(form){
    console.log(form)

    if(!form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.username;

    this.accountService.logIn(email, password).subscribe(
      resData => {
        console.log(resData);
        
        this.accountService.activeAccount = {username: username, email: email, password: password}
      }
    )
  }

  onRegister(form){
    //automatically move to log in after register]

    if(!form.valid){
      return;
    }    
    const email = form.value.email;
    const password = form.value.password1;

    this.accountService.signup(email, password).subscribe(
      resData => {
        console.log(resData)
      },
      error => {
        console.log(error);
        switch(error.error.error){
          case 'EMAIL_EXISTS': 
            //error = 'this email already exists'
        }
      }
    );

    form.reset();
  }
}



