import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { Match } from 'src/app/shared/match-details.model';

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

  calculatePossWin(input, matches){

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
      
      possWin = input.value * combinedOdd;
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

  betWasPlaced = new EventEmitter<void>();
  placeBet(){
    this.betWasPlaced.emit();
  }
  
  idForMatchRemove = new EventEmitter<number>();
  removeMatch(id: number){
    this.idForMatchRemove.emit(id)
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
    }),//catcherror
    )
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  organiseMatchesData(matches){ 
    matches.forEach((specificMatches, index) => {
      matches[index] = Object.values(specificMatches)
      matches[index].splice(-1);
    });

    this.NBAMatches = matches[0];//object of arrs to firebase?
    this.UFCMatches = matches[1];
    this.UEFAMatches = matches[2];
  }

  NBAMatches: Match[] = [
    // {
    //   home: 'nets',
    //   away: 'spurs',
    //   homeOdd: 1.1,
    //   awayOdd: 2.9
    // },
    // {
    //   home: 'nets',
    //   away: 'celtics',
    //   homeOdd: 1.2,
    //   awayOdd: 2.8
    // },
    // {
    //   home: 'nets',
    //   away: '76ers',
    //   homeOdd: 1.3,
    //   awayOdd: 2.7
    // },
    // {
    //   home: 'nets',
    //   away: 'nuggets',
    //   homeOdd: 1.4,
    //   awayOdd: 2.6
    // }
  ]
  UFCMatches = [
    // {
    //   home: 'Ngannou',
    //   away: 'Miocic',
    //   homeOdd: 1.1,
    //   awayOdd: 2.9
    // },
    // {
    //   home: 'Blachovicz',
    //   away: 'Adesanya',
    //   homeOdd: 1.2,
    //   awayOdd: 2.8
    // },
    // {
    //   home: 'Poirier',
    //   away: 'McGregor',
    //   homeOdd: 1.3,
    //   awayOdd: 2.7
    // },
    // {
    //   home: 'Ferguson',
    //   away: 'Nurmagomedov',
    //   homeOdd: 1.4,
    //   awayOdd: 2.6
    // }
  ]
  UEFAMatches = [
    // {
    //   home: 'Georgia',
    //   away: 'Spain',
    //   homeOdd: 1.1,
    //   awayOdd: 2.9
    // },
    // {
    //   home: 'Greece',
    //   away: 'Georgia',
    //   homeOdd: 1.2,
    //   awayOdd: 2.8
    // },
    // {
    //   home: 'Germany',
    //   away: 'Brazil',
    //   homeOdd: 1.3,
    //   awayOdd: 2.7
    // }
  ]
}
