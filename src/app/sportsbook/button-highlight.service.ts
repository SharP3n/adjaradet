import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ButtonHighlightService {

  highlightedButtons = new EventEmitter<{id: number, bettingOn: string}[]>();

  matchesData: {id: number, bettingOn: string}[] = [];

  highlightButtons(match){
    this.matchesData.push({id: match.id, bettingOn: match.bettingOn})
    this.highlightedButtons.emit(this.matchesData)
  }

  // removedMatch = new EventEmitter<{id: number, bettingOn: string}>();
    

}