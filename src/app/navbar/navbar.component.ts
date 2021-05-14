import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubSink } from 'subsink';
import { AccountService } from '../shared/services/account.service';
import { BetsHistoryService } from '../shared/services/bets-history.service';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    private accountService: AccountService,
    private store: Store<{account: Account}>,
    private messageService: MessageService,
    private betsHistoryService: BetsHistoryService
  ) { }
  
  showMessage = false;
  messageData: {message: string, error: boolean, state: string}

  autoCancelMessage(message: {message: string, error: boolean, state: string}){
    setTimeout(() => {
      this.messageData = {message: message.message, error: message.error, state: 'inactive'}
      setTimeout(()=>{
        this.showMessage = false;
      }, 1000)
    }, 5000);
  }

  account: Account;
  
  ngOnInit(): void {
    this.subs.sink = this.betsHistoryService.betsUpdated.subscribe((betsQuantity) =>{
      this.betsQuantity = betsQuantity
    })

    this.store.select('account').subscribe(account=>{
       this.account = account
    });

    this.subs.sink = this.messageService.message.subscribe((message: {message: string, error: boolean, state: string}) => {

      if(!this.showMessage){
        this.messageData = {message: message.message, error: message.error, state: 'active'}
        this.showMessage = true;
        this.autoCancelMessage(message);
      }
      else{
        setTimeout(() => {
          if(!this.showMessage){
            this.messageData = {message: message.message, error: message.error, state: 'active'}
            this.showMessage = true;
            this.autoCancelMessage(message);
          }

          setTimeout(() => {
            if(!this.showMessage){
              this.messageData = {message: message.message, error: message.error, state: 'active'}
              this.showMessage = true;
              this.autoCancelMessage(message);
            }
          }, 2500);
        }, 2500);
      }
    })
  }

  private subs = new SubSink();

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  onOpenModal(purpose: string){
    this.accountService.toggleModal(true, purpose);
  }

  logOut(){
    this.accountService.logOut();
    this.messageService.message.next({message: 'Logged Out', error: false});
  }

  betsQuantity = 0;
}
