import { Component, Input, OnChanges, OnInit, EventEmitter, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Bet } from 'src/app/sportsbook/bet-details.model';
import { BetDetailsService } from 'src/app/shared/bet-details.service';
import { ButtonHighlightService } from '../button-highlight.service'
import { match } from 'src/app/shared/match-details.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnChanges{

  @ViewChild('inputBet') inputBet: ElementRef;

  removeMatch(e){
    this.matches.splice(e.target.getAttribute('data-id'), 1);
    this.calculatePossWin(this.inputBet.nativeElement);
    
    if(this.matches.length < 1){
      this.inputCanBeFilled = false;
      this.inputBet.nativeElement.value = '';
      this.clearData(this.inputBet.nativeElement);
    }
    this.buttonHighlightService.highlightButtons(this.matches)
  }

  calculatePossWin(input){
    this.matches.forEach((bet, i) => {
      if(i === 0){
        this.combinedOdd = bet.odd;
      }
      else if(i > 0){
        this.combinedOdd *= bet.odd;
        this.combinedOdd = Math.round(this.combinedOdd * 100) / 100;
      }
      
      this.possWin = input.value * this.combinedOdd;

      this.possWin = Math.round(this.possWin * 100) / 100;
  
      if(this.possWin > 0){
        this.betCanBePlaced = true;
      }
      else{
        this.betCanBePlaced = false;
      }
    });
  }

  possWin: number;
  betDetails: Bet;
  matches = [];
  combinedOdd: number;
  inputCanBeFilled = false;
  betCanBePlaced = false;

  placeBet(betAmount){
    this.matches.forEach(bet => {
      delete bet.odd;
      delete bet.bettingOn;
      delete bet.id;
    });

    this.betDetails = new Bet(this.combinedOdd, Number(betAmount.value), this.possWin)
    this.betDetailsService.createBet(this.matches, this.betDetails);
    this.clearData(betAmount);
  }

  clearData(betAmount: HTMLInputElement){
    this.matches = [];
    delete this.possWin;
    delete this.betDetails;
    delete this.combinedOdd;
    delete this.newMatch;
    betAmount.value = '';
    this.inputCanBeFilled = false;
    this.betCanBePlaced = false;
  }

  @Input() newMatch: match;

  ngOnChanges(changes: SimpleChanges){

    if(changes.newMatch.currentValue && changes.newMatch.previousValue !== changes.newMatch.currentValue){ 
      this.inputCanBeFilled = true;

      if(this.matches.length > 0){

        this.matches.forEach(match => {
          if(match.id === this.newMatch.id && match.bettingOn === this.newMatch.bettingOn){
            this.matches.splice(this.matches.indexOf(match), 1);
          }
        });
        
        this.matches.forEach(match => {
          
          if(match.id === this.newMatch.id){

            if(match.bettingOn !== this.newMatch.bettingOn){
              this.matches.push(this.newMatch);
              this.calculatePossWin(this.inputBet.nativeElement)
              this.matches.splice(this.matches.indexOf(match), 1);
            }
          }
          else if(this.matches.indexOf(match) === this.matches.length-1){
            this.matches.push(this.newMatch);
            this.calculatePossWin(this.inputBet.nativeElement)
          }   
        });
      }
      
      else{
        this.matches.push(this.newMatch);
        this.calculatePossWin(this.inputBet.nativeElement)
      }
      this.buttonHighlightService.highlightButtons(this.matches)
    }
    
  }

  constructor(private betDetailsService: BetDetailsService, private buttonHighlightService: ButtonHighlightService) { }

  

}
