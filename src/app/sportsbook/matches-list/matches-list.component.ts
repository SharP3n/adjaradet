import { Component, EventEmitter, ElementRef, OnInit, ViewChild, Output, AfterViewInit, OnChanges} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BetDetailsService } from 'src/app/shared/bet-details.service';
import { match } from 'src/app/shared/match-details.model';
import { ButtonHighlightService } from 'src/app/sportsbook/matches-list/button-highlight.service';

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss']
})
export class MatchesListComponent implements OnInit{

  constructor( private route: ActivatedRoute, private betDetailsService: BetDetailsService, private buttonHighlightService: ButtonHighlightService) { }
  
  ngOnInit(): void {

    this.display = this.route.snapshot.params['sport'];

    this.route.params.subscribe(
      (params: Params) => {
        this.display = params['sport'];
      }
    )

    this.betDetailsService.betPlaced.subscribe( () =>{
      let bet = document.querySelectorAll('.added-bet');
      bet.forEach( btn => {
        btn.classList.remove('added-bet');
      });
    }
    )
    
    this.buttonHighlightService.highlightedButtons.subscribe( (highlightsData: match[]) =>{
      this.infoForHighlight = highlightsData;
      this.resetHighlights(this.infoForHighlight);
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
  
  resetHighlights(highlightsData: {id: number, bettingOn: string}[]){ 

    setTimeout(() => {
  //setTimeout is gareshe(button it roca vidzaxeb funqcias) sportze gadasvlamde agebul matchebs iyenebda funqciashi
      
      this.removeAllHighlights();
      let btnsArr: NodeListOf<Element>;  
      
      highlightsData.forEach(btnInfo => {
  
        if(btnInfo.bettingOn === 'home'){
          btnsArr = document.querySelectorAll('.home');
        }
        else if(btnInfo.bettingOn === 'away'){
          btnsArr = document.querySelectorAll('.away');
        }
      
        btnsArr.forEach(btn => {
          if(Number(btn.getAttribute('data-id')) === Number(btnInfo.id)){
            btn.classList.add('added-bet');
          }
        });
      });
    }, 0);
  }
  
  @ViewChild('NBA') NBA: ElementRef;
  @ViewChild('UFC') UFC: ElementRef;
  @ViewChild('UEFA') UEFA: ElementRef;
  display: string;
  bet: {home: any, away: string, bettingOn: string, odd: number, id:number}
  
  addToBet(e){
    let index = e.target.getAttribute('data-id');
    
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
    
    this.bet = {home: betDetails.home, away: betDetails.away, bettingOn: bettingOn, odd: odd, id: index};
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
