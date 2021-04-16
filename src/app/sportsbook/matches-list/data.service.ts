import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

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



  NBAMatches = [
    {
      home: 'NETS',
      away: 'SPURS',
      homeOdd: 1.1,
      awayOdd: 2.9
    },
    {
      home: 'NETS',
      away: 'CELTICS',
      homeOdd: 1.2,
      awayOdd: 2.8
    },
    {
      home: 'NETS',
      away: '76ers',
      homeOdd: 1.3,
      awayOdd: 2.7
    },
    {
      home: 'NETS',
      away: 'NUGGETS',
      homeOdd: 1.4,
      awayOdd: 2.6
    }
  ]
  UFCMatches = [
    {
      home: 'Ngannou',
      away: 'Miocic',
      homeOdd: 1.1,
      awayOdd: 2.9
    },
    {
      home: 'Blachovicz',
      away: 'Adesanya',
      homeOdd: 1.2,
      awayOdd: 2.8
    },
    {
      home: 'Poirier',
      away: 'McGregor',
      homeOdd: 1.3,
      awayOdd: 2.7
    },
    {
      home: 'Ferguson',
      away: 'Nurmagomedov',
      homeOdd: 1.4,
      awayOdd: 2.6
    }
  ]
  UEFAMatches = [
    {
      home: 'Georgia',
      away: 'Spain',
      homeOdd: 1.1,
      awayOdd: 2.9
    },
    {
      home: 'Greece',
      away: 'Georgia',
      homeOdd: 1.2,
      awayOdd: 2.8
    },
    {
      home: 'Germany',
      away: 'Brazil',
      homeOdd: 1.3,
      awayOdd: 2.7
    },
  ]
}
