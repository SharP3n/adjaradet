import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { BetDetailsService } from 'src/app/shared/bet-details.service';
import { Bet } from '../../bet-details.model';
import { DataService } from '../../matches-list/data.service';

@Component({
  selector: 'app-bet-place',
  templateUrl: './bet-place.component.html',
  styleUrls: ['./bet-place.component.scss']
})
export class BetPlaceComponent implements OnInit, OnChanges {

  constructor(private dataService: DataService, private betDetailsService: BetDetailsService) { }

  ngOnInit(): void {
  }

  @ViewChild('inputBet') inputBet: ElementRef;

  inputCanBeFilled = false;
  betDetails: Bet;
  @Input() matches;//interface

  placeBet(betAmount){
    this.matches.forEach(bet => {
      delete bet.odd;
      delete bet.bettingOn;
      delete bet.id;
    });

    this.betDetails = new Bet(this.betInfo.odd, Number(betAmount.value), this.betInfo.possWin)
    this.betDetailsService.createBet(this.matches, this.betDetails);
    this.clearData(betAmount);
  }

  betInfo: {odd: number, possWin: number, betCanBePlaced: boolean};
  odd: number;
  
  calculatePossWin(inputBet, matches){
    this.betInfo = this.dataService.calculatePossWin(inputBet, matches);
    this.odd = this.betInfo.odd;
  }
  
  clearData(betAmount: HTMLInputElement){
    this.dataService.placeBet();
    betAmount.value = '';
    this.inputCanBeFilled = false;
    delete this.betDetails;
    delete this.betInfo;
    delete this.odd;
  }

  ngOnChanges(changes: SimpleChanges){

    if(changes.matches.currentValue && changes.matches.currentValue !== changes.matches.previousValue){
      if(this.matches.length === 0){
        this.inputCanBeFilled = false;
        if(this.inputBet){
          this.inputBet.nativeElement.value = '';
          this.clearData(this.inputBet.nativeElement)
        }
      }
      else{
        this.inputCanBeFilled = true;
        if(this.inputBet.nativeElement.value === ''){
          this.odd =  this.dataService.calculatePossWin(this.inputBet, this.matches).odd;
        }
        else if(this.inputBet.nativeElement.value > 0){
          this.betInfo = this.dataService.calculatePossWin(this.inputBet.nativeElement, this.matches);
        }
      }
    }
  }
}
