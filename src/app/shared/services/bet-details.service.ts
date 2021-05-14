import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bet } from '../../sportsbook/bet-details.model';
import { FullBet } from '../models/full-bet-details.model';
import { Match } from '../models/match-details.model';
import * as accountActions from '../store/account.actions'
import { Account } from '../models/account.model';
import { AccountService } from './account.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BetDetailsService{

  addedBets: FullBet[] = []
  newBet: FullBet;
  betPlaced = new Subject<void>();
  betCanNotBePlaced = new Subject<void>();
  creatingBet = new Subject<boolean>();
  account: Account;

  constructor(private accountService: AccountService, private store: Store<{account: Account}>){
    this.store.select('account').subscribe((account)=>{
      this.account = account;
    })
  }
  
  createBet(matchesDetails: Match[], betDetails: Bet){
    if(this.checkBalance(betDetails.betAmount)){
      this.newBet = new FullBet(betDetails, matchesDetails)
      this.addedBets.push(this.newBet);
      this.store.dispatch(new accountActions.updateBalance(this.account.balance - betDetails.betAmount))
      this.betPlaced.next();
      this.accountService.message.next({message: `Your Bet Was Placed`, error: false})
      return true;
    }
    else{
      this.betCanNotBePlaced.next();
      return false;
    }
  }

  checkBalance(betAmount: number){
    if(this.account.balance < betAmount){
      this.accountService.message.next({message: 'Not Enough Money On Your Account', error: true})
      return false;
    }
    else{
      return true;
    }
  }
  
  getData(){
    return this.addedBets;
  }

}
