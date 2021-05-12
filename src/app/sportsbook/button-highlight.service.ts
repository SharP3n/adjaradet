import { Injectable, EventEmitter } from "@angular/core";
import { Match } from "../shared/models/match-details.model";

@Injectable({
    providedIn: 'root'
})

export class ButtonHighlightService {

  highlightButtons = new EventEmitter<Match[]>();
  matches: Match[] = [];
  
  formHighlightData(matches: Match[]){
    this.matches = [...matches]

    this.matches.forEach((match, i: number) => {
      this.matches[i] = {away: match.away, home: match.home, bettingOn: match.bettingOn}
    });
    
    this.highlightButtons.emit(this.matches)
  }



}