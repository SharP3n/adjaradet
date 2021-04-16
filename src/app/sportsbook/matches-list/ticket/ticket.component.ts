import { Component, OnInit,} from '@angular/core';
import { Bet } from 'src/app/sportsbook/matches-list/bet-details.model';
import { BetDetailsService } from 'src/app/shared/bet-details.service';
import { ButtonHighlightService } from '../button-highlight.service'
import { match } from 'src/app/shared/match-details.model';
import { DataService } from '../data.service';
import { NewMatchService } from '../new-match.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit{

  possWin: number;
  matches = [];
  combinedOdd: number;
  inputCanBeFilled = false;
  betCanBePlaced = false;

  constructor(private newMatchService: NewMatchService, public dataService: DataService,
    private buttonHighlightService: ButtonHighlightService) { }

  checkMatchIdentity(newMatch){

    if(this.matches.length > 0){

      let canBeAdded = true;
      for (const match of this.matches) {
        if(match.home === newMatch.home && match.away === newMatch.away){
          canBeAdded = false;
          this.matches.splice(this.matches.indexOf(match), 1);
          if(match.bettingOn !== newMatch.bettingOn){
            this.matches.push(newMatch);
            this.matches = this.matches.slice();
            break;
          }
          this.matches = this.matches.slice();
        }
      }

      if(canBeAdded){
        this.matches.push(newMatch)
        this.matches = this.matches.slice();
      }
    }
    else{
      this.matches.push(newMatch);
      this.matches = this.matches.slice();
      this.inputCanBeFilled = true;
    }
  }
  
  highlightBtns(){
    this.buttonHighlightService.highlightButtons(this.matches)
  }

  ngOnInit(){
    this.newMatchService.newMatch.subscribe((newMatch) => {
      this.checkMatchIdentity(newMatch);
      this.highlightBtns();
    })
    
    this.dataService.betWasPlaced.subscribe(() => {
      this.matches = [];
    })
    
    this.dataService.idForMatchRemove.subscribe((id) => {
      this.matches.splice(id, 1)
      this.matches = this.matches.slice();
      this.highlightBtns();
    });
  }
  

}
