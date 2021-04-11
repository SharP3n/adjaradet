import { Injectable, EventEmitter } from "@angular/core";
import { match } from "../shared/match-details.model";

@Injectable({
    providedIn: 'root'
})

export class ButtonHighlightService {

  highlightedButtons = new EventEmitter<{id: number, bettingOn: string}[]>();

  matchesData: match[] = [];

  highlightButtons(matches: match[]){
    this.matchesData = matches;
    this.highlightedButtons.emit(this.matchesData)
  }


}