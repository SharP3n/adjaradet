import { Injectable, EventEmitter } from '@angular/core';
import { Bet } from '../sportsbook/bet-details.model';
import { fullBet } from './full-bet-details.model';
import { match } from './match-details.model';

@Injectable({
  providedIn: 'root'
})
export class BetDetailsService {

  addedBets: fullBet[] = [
  ]
  
  newBet: fullBet;
  betPlaced = new EventEmitter;
  
  createBet(matchesDetails: match[], betDetails: Bet){
    this.newBet = new fullBet(betDetails, matchesDetails)
    this.addedBets.push(this.newBet);
    this.betPlaced.emit();
  }

  getData(){
    return this.addedBets;
  }

  constructor() { }
}
