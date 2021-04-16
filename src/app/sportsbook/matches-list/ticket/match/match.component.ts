import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit, OnChanges {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  removeMatch(){
    this.dataService.removeMatch(this.id)
  }

  @Input() match;
  @Input() id: number;
  odd: number;

  ngOnChanges(){
    if(this.match.bettingOn === 'home'){
      this.odd = this.match.homeOdd;
    }
    else if(this.match.bettingOn === 'away'){
      this.odd = this.match.awayOdd;
    }
  }

}
