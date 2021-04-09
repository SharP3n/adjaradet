import { Component, Input, OnChanges, OnInit, EventEmitter, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Bet } from 'src/app/sportsbook/bet-details.model';
import { BetDetailsService } from 'src/app/shared/bet-details.service';
import { ButtonHighlightService } from '../button-highlight.service'

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit, OnChanges{

  @ViewChild('inputBet') inputBet: ElementRef;

  removeMatch(e){
    let removeID = e.target.getAttribute('data-id');
    // this.matchRemoveService.removedMatch.emit({id: this.matchesDetails[removeID].id, bettingOn: this.matchesDetails[removeID].bettingOn})
    this.matchesDetails.splice(removeID, 1);
    this.possWinCalc(this.inputBet.nativeElement);
    
    if(this.matchesDetails.length < 1){
      this.inputCanBeFilled = false;
      this.inputBet.nativeElement.value = '';
    }
  }

  possWinCalc(input){
    this.matchesDetails.forEach((bet, i) => {
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
  matchesDetails = [];
  combinedOdd: number;
  inputCanBeFilled = false;
  betCanBePlaced = false;

  placeBet(inputBet: HTMLInputElement){

    this.matchesDetails.forEach(bet => {
      delete bet.odd;
      delete bet.bettingOn;
      delete bet.id;
    });

    this.betDetails = new Bet(this.combinedOdd, Number(inputBet.value), this.possWin)
    this.betDetailsService.createBet(this.matchesDetails, this.betDetails);
    this.clearData(inputBet);
    this.betDetailsService.betPlaced.emit(this.betDetailsService.addedBets);
  }

  clearData(inputBet: HTMLInputElement){
    this.matchesDetails = [];
    delete this.possWin;
    delete this.betDetails;
    delete this.combinedOdd;
    delete this.newMatch;
    inputBet.value = '';
    this.inputCanBeFilled = false;
    this.betCanBePlaced = false;
  }

  @Input() newMatch: {home: string, away: string, bettingOn: string, odd: number, id: number}

  ngOnChanges(changes: SimpleChanges){//change matchDetails into matches
    if(changes.newMatch.currentValue){  //only for newMatch changes
      this.inputCanBeFilled = true;

      if(this.matchesDetails.length > 0){
        
        this.matchesDetails.forEach(match => {

          if(match.id === this.newMatch.id){//delete match if it is repeated
            
            this.matchesDetails.splice(this.matchesDetails.indexOf(match), 1);

            // console.log(match.bettingOn);
            // console.log(this.newMatch.bettingOn);
                
            if(match.bettingOn !== this.newMatch.bettingOn){//if bettingOn is not same add new
              console.log('adding new');
              this.matchesDetails.push(this.newMatch);
              this.possWinCalc(this.inputBet.nativeElement)
            }
          }
          else if(this.matchesDetails.indexOf(match) === this.matchesDetails.length-1){
            this.matchesDetails.push(this.newMatch);
            this.possWinCalc(this.inputBet.nativeElement)
          }   
        });
      }

      else{
        this.matchesDetails.push(this.newMatch);
        this.possWinCalc(this.inputBet.nativeElement)
      }
      this.buttonHighlightService.highlightButtons(this.matchesDetails[this.matchesDetails.length - 1])
    }
      
    //if id is same check bettingOn, if it's different, change, if not, remove
  }

  constructor(private betDetailsService: BetDetailsService, private buttonHighlightService: ButtonHighlightService) { }

  ngOnInit(): void {
    
  }
  

}
