import { Bet } from "../sportsbook/matches-list/bet-details.model";
import { Match } from "./match-details.model";

export class FullBet{

    constructor(public betDetails: Bet, public matchDetails: Match[]){
        this.betDetails = betDetails;
        this.matchDetails = matchDetails;
    }
    
}