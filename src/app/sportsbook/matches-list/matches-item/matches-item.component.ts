import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ButtonHighlightService } from '../button-highlight.service';
import { DataService } from '../data.service';
import { NewMatchService } from '../new-match.service';

@Component({
  selector: 'app-matches-item',
  templateUrl: './matches-item.component.html',
  styleUrls: ['./matches-item.component.scss']
})
export class MatchesItemComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {

  }

  @Input() match: {home: string, away: string, homeOdd: number, awayOdd: number};

}
