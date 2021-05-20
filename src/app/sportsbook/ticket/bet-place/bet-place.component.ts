import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Match } from 'src/app/shared/models/match-details.model';
import { AccountService } from 'src/app/shared/services/account.service';
import { BetDetailsService } from 'src/app/shared/services/bet-details.service';
import { Bet } from '../../bet-details.model';
import { DataService } from '../../matches-list/data.service';
import * as accountActions from '../../../shared/store/account.actions'

@Component({
  selector: 'app-bet-place',
  templateUrl: './bet-place.component.html',
  styleUrls: ['./bet-place.component.scss']
})
export class BetPlaceComponent implements OnInit, OnChanges {

  constructor(
    private dataService: DataService,
    private betDetailsService: BetDetailsService,
    public accountService: AccountService,
    private store: Store<{account: Account}>,
  ) { }

  ngOnInit(): void {
  }

  @ViewChild('inputBet') inputBet: ElementRef;

  inputCanBeFilled = false;
  betDetails: Bet;
  @Input() matches: Match[];

  placeBet(betAmount: HTMLInputElement){
    this.matches.forEach(match => {
      delete match.odd;
      delete match.bettingOn;
      delete match.id;
    });

    this.betDetails = new Bet(this.betInfo.odd, +betAmount.value, this.betInfo.possWin)
    if(this.betDetailsService.createBet(this.matches, this.betDetails)){
      this.dataService.placeBet();
    }
    else{
      this.clearData(betAmount);
    }
  }

  betInfo: {odd: number, possWin: number, betCanBePlaced: boolean};
  odd: number;
  
  calculatePossWin(inputBet: HTMLInputElement, matches: Match[]){
    this.betInfo = this.dataService.returnPossWin(inputBet, matches);
    this.odd = this.betInfo.odd;
  }
  
  clearData(betAmount: HTMLInputElement){
    betAmount.value = '';
    this.inputCanBeFilled = false;
    this.store.dispatch(new accountActions.updateBetPlacingState(this.inputCanBeFilled))
    delete this.betDetails;
    delete this.betInfo;
    delete this.odd;
  }

  ngOnChanges(changes: SimpleChanges){

    if(changes.matches.currentValue && changes.matches.currentValue !== changes.matches.previousValue){
      if(this.matches.length === 0){
        this.inputCanBeFilled = false;
        this.store.dispatch(new accountActions.updateBetPlacingState(this.inputCanBeFilled))
        if(this.inputBet){
          this.inputBet.nativeElement.value = '';
          this.clearData(this.inputBet.nativeElement)
        }
      }
      else{
        this.inputCanBeFilled = true;
        this.store.dispatch(new accountActions.updateBetPlacingState(this.inputCanBeFilled))
        if(this.inputBet.nativeElement.value === ''){
          this.odd =  this.dataService.returnPossWin(this.inputBet.nativeElement, this.matches).odd;
        }
        else if(this.inputBet.nativeElement.value > 0){
          this.betInfo = this.dataService.returnPossWin(this.inputBet.nativeElement, this.matches);
        }
      }
    }
  }
}
