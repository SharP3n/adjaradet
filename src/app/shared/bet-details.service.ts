import { Injectable, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bet } from '../sportsbook/bet-details.model';
import { FullBet } from './full-bet-details.model';
import { Match } from './match-details.model';
import * as accountActions from '../navbar/modal/log-in/store/account.actions'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root'
})
export class BetDetailsService {

  addedBets: FullBet[] = []
  newBet: FullBet;
  betPlaced = new EventEmitter;
  
  createBet(matchesDetails: Match[], betDetails: Bet){
    this.newBet = new FullBet(betDetails, matchesDetails)
    this.addedBets.push(this.newBet);
    // console.log(betDetails.betAmount)
    this.checkBalance(betDetails.betAmount);
    this.betPlaced.emit();
    // this.store.dispatch(new accountActions.inputBalance(betDetails.betAmount))
  }

  account: Account

  checkBalance(betAmount: number){
  }

  // constructor(private store: Store<{account: Account}>) { }

  creatingBet = new EventEmitter<boolean>();


  ngOnInit(): void {

  }
  getData(){
    return this.addedBets;
  }

}
