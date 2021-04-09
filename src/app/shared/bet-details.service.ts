import { Injectable, EventEmitter } from '@angular/core';
import { Bet } from '../sportsbook/bet-details.model';
import { fullBet } from './full-bet-details.model';
import { match } from './match-details.model';

@Injectable({
  providedIn: 'root'
})
export class BetDetailsService {//keep all bets!

  addedBets: fullBet[] = [
  ] //home, away, odd, betAmount, possWin
  
  newBet: fullBet;
  betPlaced = new EventEmitter<fullBet[]>();
  
  createBet(matchesDetails: match[], betDetails: Bet){
    this.newBet = new fullBet(betDetails, matchesDetails)
    this.addedBets.push(this.newBet);
    this.betPlaced.emit(this.addedBets.slice());
  }

  getData(){
    return this.addedBets;
  }
  
  constructor() { }
}
