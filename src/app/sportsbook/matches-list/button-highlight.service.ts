import { Injectable, EventEmitter } from "@angular/core";
import { match } from "../../shared/match-details.model";

@Injectable({
    providedIn: 'root'
})

export class ButtonHighlightService {

  highlightedButtons = new EventEmitter<{id: number, bettingOn: string}[]>();
  matches;
  
  highlightButtons(matches: match[]){
    // this.matches = matches;
    // this.highlightedButtons.emit(matches)
  }
  
  fakeEvent = new EventEmitter<void>();
  fakeFire(){
    this.highlightedButtons.emit(this.matches)
  }


}