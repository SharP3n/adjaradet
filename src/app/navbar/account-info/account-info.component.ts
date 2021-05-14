import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Account } from 'src/app/shared/models/account.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { BalanceService } from 'src/app/shared/services/balance.service';
import { MessageService } from 'src/app/shared/services/message.service';
import * as accountActions from '../../shared/store/account.actions'

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  @ViewChild('password') password: ElementRef;

  constructor(
    private store: Store<{account: Account}>,
    private accountService: AccountService,
    private balanceService: BalanceService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.store.select('account').subscribe((account)=>{
      this.account = account;
    })
  }
  
  addMoney(moneyAmount: HTMLInputElement){
    this.store.dispatch(new accountActions.updateBalance(this.account.balance + +moneyAmount.value));
    this.balanceService.changeBalance(this.account.email, this.account.balance)

    moneyAmount.value = '';
    this.messageService.message.next({message: `your current balance is ${this.account.balance}$`, error: false})
  }

  account: Account;

  toggleVisibility() {
    if (this.password.nativeElement.type === "password") {
      this.password.nativeElement.type = "text";
    } else {
      this.password.nativeElement.type = "password";
    }
  }
}
