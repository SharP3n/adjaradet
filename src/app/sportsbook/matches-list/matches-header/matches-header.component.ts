import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ButtonHighlightService } from '../button-highlight.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-matches-header',
  templateUrl: './matches-header.component.html',
  styleUrls: ['./matches-header.component.scss']
})
export class MatchesHeaderComponent implements OnInit {

  constructor(public dataService: DataService, private activeRoute: ActivatedRoute, private ButtonHighlightsService: ButtonHighlightService) { }
  
  ngOnInit(): void {
    
    // this.activeSport = this.activeRoute.snapshot.params['sport'];
    
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.activeSport = params['sport'];
        this.ActiveSport.emit(this.activeSport)
      }
      )    
  }

  fireEvent(){
    this.ButtonHighlightsService.fakeFire();
  }
    
  @Output() ActiveSport = new EventEmitter<string>(); 
  activeSport: string;

}
