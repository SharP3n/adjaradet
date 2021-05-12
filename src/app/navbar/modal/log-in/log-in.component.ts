import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from 'src/app/shared/models/account.model';
import { AccountService } from 'src/app/shared/services/account.service';
import * as accountActions from './store/account.actions'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private store: Store<{account: Account}>
  ) {}

  account: Observable<Account>
  @ViewChild('logInForm') logInForm: NgForm; 
  inputMessage: string;

  ngOnInit(): void {
    this.account = this.store.select('account');
  }
  
  onLogin(form: NgForm){

    if(!form.valid){
      return;
    }

    const email: string = form.value.email;
    const password: string = form.value.password;

    this.accountService.logIn(email, password).subscribe(
      () => {
        this.store.dispatch(new accountActions.changeUser({email: email, password: password, balance: 10}))
        this.accountService.message.emit({message: `welcome ${email}`, error: false})
      },error => {
        if(error?.error?.error?.message){
          this.accountService.message.emit({message: error?.error?.error?.message.replace(/_/g, " "), error: true})
        }
        else{
          this.accountService.message.emit({message: 'something went wrong, Check your connection', error: true})
        }
      }
    )

    form.reset();
    this.accountService.toggleModal(false, '');
  }
  
  onCancelModal(){
    this.accountService.toggleModal(false, '')
    this.logInForm.reset();
  }
  
}


