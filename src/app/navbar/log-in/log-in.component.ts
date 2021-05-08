import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from 'src/app/shared/account.model';
import { AccountService } from 'src/app/shared/account.service';
import * as accountActions from './store/account.actions'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private store: Store<{accounts: Account[]}>
  ) {}

  accounts: Observable<Account[]>

  ngOnInit(): void {
    this.accountService.displayModal.subscribe((modalInfo: {displayModal: boolean, action: string}) => {
      this.action = modalInfo.action;
      this.showModal = modalInfo.displayModal;
    })
    
    this.accounts = this.store.select('accounts');

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
  showModal: boolean;

  onCancelModal(state){
    this.showModal = false;
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
        
        this.store.dispatch(new accountActions.changeUser({username: username, email: email, password: password}))
      }
    )

    form.reset();
    this.showModal = false;
  }

  onRegister(form){
    //automatically move to log in after register

    if(!form.valid || form.value.password1 !== form.value.password2){
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
    this.showModal = false;
  }
  
  doubleCheckValidity(password1, password2, submitBtn: HTMLButtonElement){
    
    // if(password1.value !== password2.value || !this.registerForm.valid){
    //   submitBtn.style.backgroundColor = 'red';
    //   submitBtn.style.cursor = 'not-allowed'
    //   submitBtn.disabled = true;
    // }
    // else if (this.registerForm.valid){
    //   console.log('shevida2')
    //   submitBtn.style.backgroundColor = 'green';
    //   submitBtn.style.cursor = 'pointer'
    //   submitBtn.disabled = false;
    // }
  }

  
}


