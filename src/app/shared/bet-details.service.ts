import { Injectable, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Bet } from '../sportsbook/matches-list/bet-details.model';
import { FullBet } from './full-bet-details.model';
import { Match } from './match-details.model';
import * as accountActions from '../navbar/modal/log-in/store/account.actions'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    this.store.dispatch(new accountActions.inputBalance(betDetails.betAmount))
    this.checkBalance(betDetails.betAmount);
    this.betPlaced.emit();
  }

  account: Observable<Account>

  checkBalance(betAmount: number){
    console.log(this.account)
  }

  constructor(private store: Store<{accounts: Account}>) { }

  ngOnInit(): void {
    this.store.select('accounts')
  }
  getData(){
    return this.addedBets;
  }

}
