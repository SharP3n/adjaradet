import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-matches-header',
  templateUrl: './matches-header.component.html',
  styleUrls: ['./matches-header.component.scss']
})
export class MatchesHeaderComponent implements OnInit {

  constructor(public dataService: DataService, private activeRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.activeSport = params['sport'];
        this.ActiveSport.emit(this.activeSport)
      }
    )    
  }
    
  @Output() ActiveSport = new EventEmitter<string>(); 
  activeSport: string;

}
