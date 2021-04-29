import { viewClassName } from '@angular/compiler';
import { Component, EventEmitter, ElementRef, OnInit, ViewChild, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BetDetailsService } from 'src/app/shared/bet-details.service';
import { match } from 'src/app/shared/match-details.model';
import { ButtonHighlightService } from 'src/app/sportsbook/matches-list/button-highlight.service';
import { DataService } from './data.service';
import { MatchesHeaderComponent } from './matches-header/matches-header.component'

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss']
})
export class MatchesListComponent implements OnInit, OnChanges, AfterViewInit{

  constructor( private dataService: DataService, private route: ActivatedRoute, private betDetailsService: BetDetailsService, private buttonHighlightService: ButtonHighlightService) { }

  @ViewChild(MatchesHeaderComponent) HeaderComponent: MatchesHeaderComponent;
  
  ngAfterViewInit(){
    this.dataService.fetchMatches().subscribe(matches => {
      this.dataService.organiseMatchesData(matches) 
      this.getMatches(this.HeaderComponent.activeSport)
    });
  }
  
  
  ngOnInit(): void {
    
    this.betDetailsService.betPlaced.subscribe( () =>{
      let bet = document.querySelectorAll('.added-bet');
      bet.forEach( btn => {
        btn.classList.remove('added-bet');
      });
    }
    )
  }


  getMatches(sport: string){
    this.matches = this.dataService.returnSpecificMatches(sport);
  }

  matches = [];
  activeSport: string;
  ngOnChanges(changes: SimpleChanges){
    console.log(changes)
    if(changes.currentValue && changes.currentValue !== changes.previousValue){
    }
  }
  
  
  
  // infoForHighlight: {id: number, bettingOn: string}[] = []; 
  resetHighlights(highlightsData: {id: number, bettingOn: string}[]){ 

  //   setTimeout(() => {
  // //setTimeout is gareshe(button it roca vidzaxeb funqcias) sportze gadasvlamde agebul matchebs iyenebda funqciashi
      
  //     this.removeAllHighlights();
  //     let btnsArr: NodeListOf<Element>;  
      
  //     highlightsData.forEach(btnInfo => {
  
  //       if(btnInfo.bettingOn === 'home'){
  //         btnsArr = document.querySelectorAll('.home');
  //       }
  //       else if(btnInfo.bettingOn === 'away'){
  //         btnsArr = document.querySelectorAll('.away');
  //       }
      
  //       btnsArr.forEach(btn => {
  //         if(Number(btn.getAttribute('data-id')) === Number(btnInfo.id)){
  //           btn.classList.add('added-bet');
  //         }
  //       });
  //     });
  //   }, 0);
  }
  
  @ViewChild('NBA') NBA: ElementRef;
  @ViewChild('UFC') UFC: ElementRef;
  @ViewChild('UEFA') UEFA: ElementRef;
  bet: {home: any, away: string, bettingOn: string, odd: number, id:number}
  
  NBAMatchesLength = this.dataService.NBAMatches.length;
  UFCMatchesLength = this.dataService.UFCMatches.length;
  UEFAMatchesLength = this.dataService.UEFAMatches.length;

}
