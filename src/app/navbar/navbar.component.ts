import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BetDetailsService } from 'src/app/shared/services/bet-details.service';
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
  private betDetailsService: BetDetailsService,
  private accountService: AccountService,
  private store: Store<{account: Account}>) { }
  
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
    this.betDetailsService.betPlaced.subscribe(() =>{
      this.betsQuantity++;
    })

    this.store.select('account').subscribe(account=>{
       this.account = account
    });

    this.accountService.message.subscribe((message: {message: string, error: boolean, state: string}) => {
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













  onOpenModal(purpose: string){
    this.accountService.toggleModal(true, purpose);
  }

  logOut(){
    this.accountService.logOut();
    // this.store.dispatch(new accountActions.removeUser())
    this.accountService.message.emit({message: 'Logged Out', error: false});
  }

  betsQuantity = 0;
}
