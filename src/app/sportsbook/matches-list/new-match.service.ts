import { Injectable, Output, EventEmitter } from '@angular/core';
import { ButtonHighlightService } from '../button-highlight.service';

@Injectable({
  providedIn: 'root'
})
export class NewMatchService {

  constructor(private buttonHighlightService: ButtonHighlightService) { }

  @Output() newMatch = new EventEmitter<{home: string, away: string, homeOdd: number, awayOdd: number, bettingOn: string}>()
  
  addNewMatch(match: {home: string, away: string, homeOdd: number, awayOdd: number}, bettingOn: string){
    this.newMatch.emit({home: match.home, away: match.away, awayOdd: match.awayOdd, homeOdd: match.homeOdd, bettingOn: bettingOn})

    // this.buttonHighlightService.formHighlightData({home: match.home, away: match.away, awayOdd: match.awayOdd, homeOdd: match.homeOdd, bettingOn: bettingOn})
  }
}
