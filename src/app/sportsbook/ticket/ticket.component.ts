import { Component, OnInit,} from '@angular/core';
import { ButtonHighlightService } from '../button-highlight.service'
import { Match } from 'src/app/shared/models/match-details.model';
import { DataService } from '../matches-list/data.service';
import { BetDetailsService } from 'src/app/shared/services/bet-details.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})

export class TicketComponent implements OnInit{

  possWin: number;
  matches: Match[] = [];
  inputCanBeFilled = false;
  betCanBePlaced = false;

  constructor(
  private dataService: DataService,
  private buttonHighlightService: ButtonHighlightService,
  private betDetailsService: BetDetailsService) { }

  checkMatchIdentity(newMatch: Match){

    if(this.matches.length > 0){
      let matchCanBeAdded = true;
      for (const match of this.matches) {

        if(match.home === newMatch.home && match.away === newMatch.away){
          matchCanBeAdded = false;
          this.matches.splice(this.matches.indexOf(match), 1);
          if(match.bettingOn !== newMatch.bettingOn){
            this.matches.push(newMatch);
            this.matches = this.matches.slice();
            break;
          }
          this.matches = this.matches.slice();
        }
      }

      if(matchCanBeAdded){
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

  ngOnInit(){
    
    this.buttonHighlightService.formHighlightData(this.matches)

    this.dataService.newMatch.subscribe((newMatch) => {
      this.checkMatchIdentity(newMatch);
      this.buttonHighlightService.formHighlightData(this.matches)
    })
    
    this.dataService.betWasPlaced.subscribe(() => {
      this.matches = [];
      this.buttonHighlightService.formHighlightData(this.matches)
    })
    
    this.dataService.idForMatchRemove.subscribe((id) => {
      this.matches.splice(id, 1)
      this.matches = this.matches.slice();
      this.buttonHighlightService.formHighlightData(this.matches)
    });
    
    this.betDetailsService.betCanNotBePlaced.subscribe(()=>{
      this.matches = [];
      this.buttonHighlightService.formHighlightData(this.matches)
    })

  }
  

}
