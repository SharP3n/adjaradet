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

  onLogin(form: {username: string, password: string, email: string}){

    // this.accountService.checkIfUserExists(form);
    this.inputMessage = `welcome ${String(form.username)}`;
    this.accountService.message.emit(this.inputMessage);
    this.accountService.activeAccount = form;
    this.display = false;
    this.logInForm.reset();
  }

  onRegister(form){
    //automatically move to log in after register]
    // console.log(form)
    // const newAcc = {form.username, form.email, form.password1}
    this.accountService.StoreAccounts({username: form.username, email: form.email, password: form.password1})
    this.registerForm.reset();
    this.display = false;//action = log in

      
    // setTimeout(() => {
      
    //   this.accountService.fetchAccounts().subscribe(accounts => {
    //     console.log(accounts)
    //   });
    // }, 0);
    // ,() => {
    //   this.accountService.message.emit('Error Occurred, Check Network Connection')//customize errors
    // });
      

  }
}



