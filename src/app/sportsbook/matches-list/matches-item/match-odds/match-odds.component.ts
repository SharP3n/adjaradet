import { Component, Input, OnInit, ViewChild, ElementRef, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import { ButtonHighlightService } from '../../button-highlight.service';
import { DataService } from '../../data.service';
import { NewMatchService } from '../../new-match.service';

@Component({
  selector: 'app-match-odds',
  templateUrl: './match-odds.component.html',
  styleUrls: ['./match-odds.component.scss']
})

export class MatchOddsComponent implements OnInit, OnChanges {

  constructor(public dataService: DataService, private newMatchService: NewMatchService, private buttonHighlightService: ButtonHighlightService) { }

  @ViewChild('home') homeBtn: ElementRef;
  @ViewChild('away') awayBtn: ElementRef;
  highlightsArr = [];
  // matches;

  ngOnInit(): void {
    this.buttonHighlightService.highlightedButtons.subscribe((matches)=>{
      // this.matches = matches;
      this.removeHighlights();
      if(matches?.length > 0 && matches){
        this.applyHighlights(matches)
      }
    })

    // this.buttonHighlightService.fakeEvent.subscribe(()=>{
    //   this.removeHighlights();
    //   if(this.matches?.length > 0 && this.matches){
    //     this.applyHighlights(this.matches)
    //   }
    // })
  }

  applyHighlights(matches){
    matches.forEach(match => {
      if(match.away === this.match.away && this.match.home === this.match.home){
        if(match.bettingOn === 'home'){
          this.homeBtn.nativeElement.classList.add('added-bet');
          console.log(this.homeBtn.nativeElement)
          // console.log('added-bet applyed (again?)')
          // this.highlightsArr.push({away: match.away, home: match.home, bettingOn: match.bettingOn})
        }
        else if(match.bettingOn === 'away'){
          this.awayBtn.nativeElement.classList.add('added-bet');
          console.log(this.awayBtn.nativeElement)
          // console.log('added-bet applyed (again?)')
          // this.highlightsArr.push({away: match.away, home: match.home, bettingOn: match.bettingOn})
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges){
  }

  removeHighlights(){
    this.homeBtn.nativeElement.classList.remove('added-bet')
    this.awayBtn.nativeElement.classList.remove('added-bet')
  }

  @Input() match: {home: string, away: string, homeOdd: number, awayOdd: number};

  addToBet(bettingOn: string){
    this.newMatchService.addNewMatch(this.match, bettingOn);
  }

}
