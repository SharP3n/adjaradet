import { Component, OnInit,} from '@angular/core';
import { ButtonHighlightService } from '../button-highlight.service'
import { Match } from 'src/app/shared/match-details.model';
import { DataService } from '../matches-list/data.service';
import { NewMatchService } from '../matches-list/new-match.service'

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})

export class TicketComponent implements OnInit{

  possWin: number;
  matches: Match[] = [];
  combinedOdd: number;
  inputCanBeFilled = false;
  betCanBePlaced = false;

  constructor(private newMatchService: NewMatchService, private dataService: DataService,
    private buttonHighlightService: ButtonHighlightService) { }

  checkMatchIdentity(newMatch){//refactor!!!!!!!!!!!!!!!!!!!! to service??????

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
    this.newMatchService.newMatch.subscribe((newMatch) => {
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

  }
  

}
