import { Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Match } from 'src/app/shared/models/match-details.model';
import { ButtonHighlightService } from '../../../button-highlight.service';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-match-odds',
  templateUrl: './match-odds.component.html',
  styleUrls: ['./match-odds.component.scss']
})

export class MatchOddsComponent implements OnInit{

  constructor(public dataService: DataService, private buttonHighlightService: ButtonHighlightService) { }

  @ViewChild('home') homeBtn: ElementRef;
  @ViewChild('away') awayBtn: ElementRef;
  highlightsArr = [];

  ngOnInit(): void {
    
    this.buttonHighlightService.highlightButtons.subscribe((matchesInBet: Match[])=>{
      this.highlightsArr = matchesInBet;
    })
  }

  @Input() match: {home: string, away: string, homeOdd: number, awayOdd: number};

  addToBet(bettingOn: string){
    this.dataService.newMatch.emit({home: this.match.home, away: this.match.away, awayOdd: this.match.awayOdd, homeOdd: this.match.homeOdd, bettingOn: bettingOn})
  }

}






















  // applyHighlights(matches){
  //   matches.forEach(match => {
  //     if(match.away === this.match.away && this.match.home === this.match.home){
  //       if(match.bettingOn === 'home'){
  //         this.homeBtn.nativeElement.classList.add('added-bet');
  //         console.log(this.homeBtn.nativeElement)
  //         // console.log('added-bet applyed (again?)')
  //         // this.highlightsArr.push({away: match.away, home: match.home, bettingOn: match.bettingOn})
  //       }
  //       else if(match.bettingOn === 'away'){
  //         this.awayBtn.nativeElement.classList.add('added-bet');
  //         console.log(this.awayBtn.nativeElement)
  //         // console.log('added-bet applyed (again?)')
  //         // this.highlightsArr.push({away: match.away, home: match.home, bettingOn: match.bettingOn})
  //       }
  //     }
  //   });
  // }




      // this.buttonHighlightService.fakeEvent.subscribe(()=>{
    //   this.removeHighlights();
    //   if(this.matches?.length > 0 && this.matches){
    //     this.applyHighlights(this.matches)
    //   }
    // })