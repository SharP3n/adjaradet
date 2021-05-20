import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bet } from '../../sportsbook/bet-details.model';
import { FullBet } from '../models/full-bet-details.model';
import { Match } from '../models/match-details.model';
import * as accountActions from '../store/account.actions'
import { Account } from '../models/account.model';
import { Subject } from 'rxjs';
import { BalanceService } from './balance.service';
import { MessageService } from './message.service';
import { BetsHistoryService } from './bets-history.service';

@Injectable({
  providedIn: 'root'
})

export class BetDetailsService{

  newBet: FullBet;
  betCanNotBePlaced = new Subject<void>();
  account: Account;

  constructor(
    private store: Store<{account: Account}>,
    private balanceService: BalanceService,
    private messageService: MessageService,
    private betsHistoryService: BetsHistoryService
  ){
    this.store.select('account').subscribe((account)=>{
      this.account = account;
    })
  }
  
  createBet(matchesDetails: Match[], betDetails: Bet){
    if(this.checkBalance(betDetails.betAmount)){
      
      this.store.dispatch(new accountActions.updateBalance(this.account.balance - betDetails.betAmount))
      this.balanceService.changeBalance(this.account.email, this.account.balance)
      this.betsHistoryService.allBets.push({bet: {betDetails: betDetails, matchDetails: matchesDetails}})
      this.betsHistoryService.betsUpdated.next(this.betsHistoryService.allBets.length)
      this.messageService.message.next({message: `Your Bet Was Placed`, error: false})
      
      this.betsHistoryService.addBetsInDB(this.account.email, {betDetails: betDetails, matchDetails: matchesDetails}).subscribe(()=>{
      }, ()=>{
        this.messageService.message.next({message: 'Check Your Network Connection', error: true})
      })

      return true;
    }
    else{
      this.betCanNotBePlaced.next();  
      this.messageService.message.next({message: 'Not Enough Money On Your Account', error: true})
      return false;
    }
  }

  checkBalance(betAmount: number){
    if(this.account.balance < betAmount){
      return false;
    }
    else{
      return true;
    }
  }

}
