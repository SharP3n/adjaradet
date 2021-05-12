import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/shared/account.service';
import { BetDetailsService } from 'src/app/shared/bet-details.service';
import { Bet } from '../../bet-details.model';
import { DataService } from '../../matches-list/data.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-bet-place',
  templateUrl: './bet-place.component.html',
  styleUrls: ['./bet-place.component.scss']
})
export class BetPlaceComponent implements OnInit, OnChanges {

  // canDeactivate(): Observable<boolean> | Promise<boolean> | boolean{
  //   console.log(this.inputCanBeFilled)
  //   if(this.inputCanBeFilled){
  //     return confirm('Do You Want To Stop Placing Bet?')
  //   }
  //   else{
  //     return true;
  //   }
  // }

  constructor(private dataService: DataService, private betDetailsService: BetDetailsService,  public accountService: AccountService) { }

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
    if(this.betDetailsService.createBet(this.matches, this.betDetails)){
      this.dataService.placeBet();
    }
    else{
      this.clearData(betAmount);
    }
  }

  betInfo: {odd: number, possWin: number, betCanBePlaced: boolean};
  odd: number;
  
  calculatePossWin(inputBet, matches){
    this.betInfo = this.dataService.calculatePossWin(inputBet, matches);
    this.odd = this.betInfo.odd;
  }
  
  clearData(betAmount: HTMLInputElement){
    betAmount.value = '';
    this.inputCanBeFilled = false;
    this.betDetailsService.creatingBet.emit(this.inputCanBeFilled)
    delete this.betDetails;
    delete this.betInfo;
    delete this.odd;
  }

  ngOnChanges(changes: SimpleChanges){

    if(changes.matches.currentValue && changes.matches.currentValue !== changes.matches.previousValue){
      if(this.matches.length === 0){
        this.inputCanBeFilled = false;
        this.betDetailsService.creatingBet.emit(this.inputCanBeFilled) 
        if(this.inputBet){
          this.inputBet.nativeElement.value = '';
          this.clearData(this.inputBet.nativeElement)
        }
      }
      else{
        this.inputCanBeFilled = true;
        this.betDetailsService.creatingBet.emit(this.inputCanBeFilled)
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
