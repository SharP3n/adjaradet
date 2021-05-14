import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from 'src/app/shared/models/account.model';
import { Match } from 'src/app/shared/models/match-details.model';

@Injectable({
  providedIn: 'root' 
})
export class DataService {

  constructor(private http: HttpClient) { }

  returnSpecificMatches(sport: string){
    switch (sport) {
      case 'NBA':
        return this.NBAMatches;
      case 'UFC':
        return this.UFCMatches;
      case 'UEFA':
        return this.UEFAMatches;

      default:
        break;
    }
  }

  fetchMatches(){
    return this.http.get<{[key: string]: Account}>('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      map(responseData => {
      const postsArr: Account[] = [];
      for(const key in responseData){
        postsArr.push({...responseData[key], id: key});
      }
      return postsArr;
    })
    )
  }

  organiseMatchesData(matches){ 
      matches.forEach((specificMatches: Match, index: number) => {
      matches[index] = Object.values(specificMatches);
      matches[index].splice(-1);
    });

    this.NBAMatches = matches[0];
    this.UFCMatches = matches[1];
    this.UEFAMatches = matches[2];
  }

  NBAMatches: Match[] = []
  UFCMatches: Match[] = []
  UEFAMatches: Match[] = []

  calculatePossWin(input: HTMLInputElement, matches: Match[]){
    let possWin: number;
    let betCanBePlaced: boolean;
    let bettingData: object;
    let combinedOdd: number;

    matches.forEach((match, i) => {
      let odd: number; 

      if(match.bettingOn === 'away'){
        odd = match.awayOdd;
      }
      else if(match.bettingOn === 'home'){
        odd = match.homeOdd;
      }

      if(i === 0){
        combinedOdd = odd;
      }
      else if(i > 0){
        combinedOdd *= odd;
        combinedOdd = Math.round(combinedOdd * 100) / 100;
      }
      
      possWin = +input.value * combinedOdd;
      possWin = Math.round(possWin * 100) / 100;
      
    });
    if(possWin > 0){
      betCanBePlaced = true;
    }
    else{
      betCanBePlaced = false;
    }
    
    return bettingData = {odd: combinedOdd, possWin: possWin, betCanBePlaced: betCanBePlaced}
  }

  newMatch = new Subject<Match>()
  betWasPlaced = new Subject<void>();
  placeBet(){
    this.betWasPlaced.next();
  }
  
  idForMatchRemove = new Subject<number>();
  removeMatch(id: number){
    this.idForMatchRemove.next(id)
  }

  
}
