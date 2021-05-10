import { Injectable, EventEmitter } from '@angular/core';
import { Bet } from '../sportsbook/matches-list/bet-details.model';
import { FullBet } from './full-bet-details.model';
import { Match } from './match-details.model';

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
    this.betPlaced.emit();
  }

  getData(){
    return this.addedBets;
  }

  constructor() { }
}
