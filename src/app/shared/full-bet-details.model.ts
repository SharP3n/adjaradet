import { Bet } from "../sportsbook/bet-details.model";
import { match } from "./match-details.model";

export class fullBet{

    constructor(public betDetails: Bet, public matchDetails: match[]){
        this.betDetails = betDetails;
        this.matchDetails = matchDetails;
    }
    // constructor(public home: string, public away: string, public sport: string, public bettingOn: string, public odd: number, public betAmount : number, public possWin: number){
    //     this.home = home;
    //     this.away = away;
    //     this.sport = sport;
    //     this.bettingOn = bettingOn;
    //     this.odd = odd;
    //     this.betAmount = betAmount;
    //     this.possWin = possWin;
    // }
    
}