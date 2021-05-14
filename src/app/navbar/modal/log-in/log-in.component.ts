import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from 'src/app/shared/models/account.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { BalanceService } from 'src/app/shared/services/balance.service';
import { MessageService } from 'src/app/shared/services/message.service';
import * as accountActions from '../../../shared/store/account.actions'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private store: Store<{account: Account}>,
    private balanceServie: BalanceService,
    private messageService: MessageService
  ) {}

  account: Observable<Account>
  @ViewChild('logInForm') logInForm: NgForm; 
  inputMessage: string;

  ngOnInit(): void {
    this.account = this.store.select('account');
  }

  showStatuses = false;
  
  onLogin(form: NgForm){

    if(!form.valid){
      this.showStatuses = true;
      return;
    }

    const email: string = form.value.email;
    const password: string = form.value.password;

    this.accountService.logIn(email, password).subscribe(
      () => {
        this.store.dispatch(new accountActions.changeUser({email: email, password: password, balance: null}))
        this.balanceServie.StoreAccountBalance(email);
        this.messageService.message.next({message: `welcome ${email}`, error: false})
      },error => {
        if(error?.error?.error?.message){
          this.messageService.message.next({message: error?.error?.error?.message.replace(/_/g, " "), error: true})
        }
        else{
          this.messageService.message.next({message: 'something went wrong, Check your connection', error: true})
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


