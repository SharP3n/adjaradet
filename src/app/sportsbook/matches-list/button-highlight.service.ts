import { Injectable, EventEmitter } from "@angular/core";
import { Match } from "../../shared/match-details.model";

@Injectable({
    providedIn: 'root'
})

export class ButtonHighlightService {

  highlightButtons = new EventEmitter<Match[]>();
  matches: Match[] = [];
  
  formHighlightData(matches: Match[]){
    this.matches = [...matches]

    this.matches.forEach((match, i: number) => {
      this.matches[i] = {away: match.away, home: match.home, bettingOn: match.bettingOn, addedToBet: true}
    });
    
    this.highlightButtons.emit(this.matches)
  }
//is addedToBet needed at all?
  resetHighlights = new EventEmitter<void>();


  // checkMatchIdentity(newMatch){//refactor!!!!!!!!!!!!!!!!!!!! to service??????

  //   if(this.matches.length > 0){

  //     let matchCanBeAdded = true;
  //     for (const match of this.matches) {
  //       if(match.home === newMatch.home && match.away === newMatch.away){
  //         matchCanBeAdded = false;
  //         this.matches.splice(this.matches.indexOf(match), 1);
  //         if(match.bettingOn !== newMatch.bettingOn){
  //           this.matches.push(newMatch);
  //           this.matches = this.matches.slice();
  //           break;
  //         }
  //         this.matches = this.matches.slice();
  //       }
  //     }

  //     if(matchCanBeAdded){
  //       this.matches.push(newMatch)
  //       this.matches = this.matches.slice();
  //     }
  //   }
  //   else{
  //     this.matches.push(newMatch);
  //     this.matches = this.matches.slice();
  //   }
  // }
  
  // fakeEvent = new EventEmitter<void>();
  // fakeFire(){
  //   this.highlightedButtons.emit(this.matches)
  // }


}