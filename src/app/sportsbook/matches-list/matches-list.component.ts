import { Component, EventEmitter, ElementRef, OnInit, ViewChild, Output} from '@angular/core';
import { BetDetailsService } from 'src/app/shared/bet-details.service';
import { match } from 'src/app/shared/match-details.model';
import { ButtonHighlightService } from 'src/app/sportsbook/button-highlight.service';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss']
})
export class MatchesListComponent implements OnInit {

  constructor( private betDetailsService: BetDetailsService, private buttonHighlightService: ButtonHighlightService) { }
  
  ngOnInit(): void {
    this.betDetailsService.betPlaced.subscribe( () =>{
      let bet = document.querySelectorAll('.added-bet');
      bet.forEach( btn => {
        btn.classList.remove('added-bet');
      });
    }
    )
    
    this.buttonHighlightService.highlightedButtons.subscribe( (highlightsData: match[]) =>{

      this.resetHighlights(highlightsData);
    }
    )
  }
  
  infoForHighlight: {id: number, bettingOn: string}[] = []; 
  
  removeAllHighlights(){
    let highlightedBtns = document.querySelectorAll('.added-bet');
    highlightedBtns.forEach(btn => {
      btn.classList.remove('added-bet');
    });    
  }
  
  resetHighlights(highlightsData: {id: number, bettingOn: string}[]){//load full list 
    
    this.removeAllHighlights();
    this.infoForHighlight = highlightsData;
    let btnsArr;  
    
    highlightsData.forEach(btnInfo => {
      
      if(btnInfo.bettingOn === 'home'){
        btnsArr = document.querySelectorAll('.home');
      }
      else if(btnInfo.bettingOn === 'away'){
        btnsArr = document.querySelectorAll('.away');
      }
    
      btnsArr.forEach(btn => {
        if(btn.getAttribute('data-id') === btnInfo.id){
          btn.classList.add('added-bet');
        }
      });
    });
  }
  
  // removeHighlight(match: {id: number, bettingOn: string}){//fixHighLight
  //   let btns;
  //   if(match.bettingOn === 'home'){
    //     btns = document.querySelectorAll('.home');
    //   }
    //   else if(match.bettingOn === 'away'){
      //     btns = document.querySelectorAll('.away');
      //   }
      
      //   // console.log(Number(match.id));
      //   btns.forEach((btn: HTMLButtonElement) => {
        
        //     // console.log(Number(btn.getAttribute('data-id')));
        
        
        //     if(Number(btn.getAttribute('data-id')) === Number(match.id)){
          //       btn.classList.remove('added-bet')
          //       console.log('removed')
          //     }
  //   });
  // }
  
  
  @ViewChild('NBA') NBA: ElementRef;
  @ViewChild('UFC') UFC: ElementRef;
  @ViewChild('UEFA') UEFA: ElementRef;
  display = 'NBA';
  //sport is going to ticket without a reason!
  @Output() bet = new EventEmitter<{home: any, away: string, bettingOn: string, odd: number, id:number}>()
  
  addToBet(e){
    let index = e.target.id;
    
    let betDetails: {home: string, away: string, homeOdd: number, awayOdd: number};
    
    if(this.display === 'NBA'){
      betDetails = this.NBAMatches[index];
    }
    else if(this.display === 'UFC'){
      betDetails = this.UFCMatches[index - this.NBAMatches.length];
    }
    if(this.display === 'UEFA'){
      betDetails = this.UEFAMatches[index - this.NBAMatches.length - this.UFCMatches.length];
    }
    
    let odd: number;
    let bettingOn: string;
    if(e.target.classList.contains('home')){
      odd = betDetails.homeOdd;
      bettingOn = 'home';
    }
    else if(e.target.classList.contains('away')){
      odd = betDetails.awayOdd;
      bettingOn = 'away';
    }
    
    // if(e.target.classList.contains('active')){
      
      // }

    // let awayBtn = document.querySelectorAll('.list__container__item__odds__away');
    // let homeBtn = document.querySelectorAll('.list__container__item__odds__home');
    // console.log(awayBtn)
    // console.log(homeBtn)

    // let btn = document.querySelectorAll('.btn');
    // console.log(btn)

    // btn.forEach(btn => {
    //   console.log(btn.getAttribute('data-id'))
    // });
      
      this.bet.emit({home: betDetails.home, away: betDetails.away, bettingOn: bettingOn, odd: odd, id: index});
      // e.target.classList.toggle('added-bet');

    // let btn =  document.querySelectorAll(`#${index}`);
    // console.log(btn)

    
  }

  
  //toggle yellow color++
  //if bets were placed remove yellows++
  //remove duplicates from arr++
  //can't give added-bet class to away and home of same match?
  //if id is same we need to toggle between same id elements?
  //after switching display, active is reset. localStorage?
  


  displayMatches(sport){ //MouseEvent
    if(sport.target.classList.contains('NBA')){
      this.display = 'NBA';
      sport.target.classList.add('active');
      this.UFC.nativeElement.classList.remove('active');
      this.UEFA.nativeElement.classList.remove('active');
    }
    else if(sport.target.classList.contains("UFC")){
      this.display = "UFC";
      sport.target.classList.add('active');
      this.NBA.nativeElement.classList.remove('active');
      this.UEFA.nativeElement.classList.remove('active');
    }
    else if(sport.target.classList.contains('UEFA')){
      this.display = 'UEFA';
      sport.target.classList.add('active');
      this.UFC.nativeElement.classList.remove('active');
      this.NBA.nativeElement.classList.remove('active');
    }
  }

  
  NBAMatches = [
    {
      home: 'NETS',
      away: 'SPURS',
      homeOdd: 1.1,
      awayOdd: 2.9
    },
    {
      home: 'NETS',
      away: 'CELTICS',
      homeOdd: 1.2,
      awayOdd: 2.8
    },
    {
      home: 'NETS',
      away: '76ers',
      homeOdd: 1.3,
      awayOdd: 2.7
    },
    {
      home: 'NETS',
      away: 'NUGGETS',
      homeOdd: 1.4,
      awayOdd: 2.6
    }
  ]
  UFCMatches = [
    {
      home: 'Ngannou',
      away: 'Miocic',
      homeOdd: 1.1,
      awayOdd: 2.9
    },
    {
      home: 'Blachovicz',
      away: 'Adesanya',
      homeOdd: 1.2,
      awayOdd: 2.8
    },
    {
      home: 'Poirier',
      away: 'McGregor',
      homeOdd: 1.3,
      awayOdd: 2.7
    },
    {
      home: 'Ferguson',
      away: 'Nurmagomedov',
      homeOdd: 1.4,
      awayOdd: 2.6
    }
  ]
  UEFAMatches = [
    {
      home: 'Georgia',
      away: 'Spain',
      homeOdd: 1.1,
      awayOdd: 2.9
    },
    {
      home: 'Greece',
      away: 'Georgia',
      homeOdd: 1.2,
      awayOdd: 2.8
    },
    {
      home: 'Germany',
      away: 'Brazil',
      homeOdd: 1.3,
      awayOdd: 2.7
    },
  ]


}
