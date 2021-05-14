import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { BetDetailsService } from 'src/app/shared/services/bet-details.service';
import { SubSink } from 'subsink';
import { DataService } from './data.service';
import { MatchesHeaderComponent } from './matches-header/matches-header.component'


@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.scss']
})
export class MatchesListComponent implements OnInit, AfterViewInit, OnDestroy{

  constructor( public dataService: DataService, private betDetailsService: BetDetailsService) { }

  @ViewChild(MatchesHeaderComponent) HeaderComponent: MatchesHeaderComponent;
  
  ngAfterViewInit(){
    this.subs.sink = this.dataService.fetchMatches().subscribe(matches => {
      this.dataService.organiseMatchesData(matches) 
      this.getMatches(this.HeaderComponent.activeSport)
    });
  }
  
  ngOnInit(): void {
    this.subs.sink = this.betDetailsService.betPlaced.subscribe( () =>{
      let bet = document.querySelectorAll('.added-bet');
      bet.forEach( btn => {
        btn.classList.remove('added-bet');
      });
    }
    )
  }

  private subs = new SubSink();

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  getMatches(sport: string){
    this.matches = this.dataService.returnSpecificMatches(sport);
  }

  matches = [];
  activeSport: string;
  
  @ViewChild('NBA') NBA: ElementRef;
  @ViewChild('UFC') UFC: ElementRef;
  @ViewChild('UEFA') UEFA: ElementRef;
  
  NBAMatchesLength = this.dataService.NBAMatches.length;
  UFCMatchesLength = this.dataService.UFCMatches.length;
  UEFAMatchesLength = this.dataService.UEFAMatches.length;

}
