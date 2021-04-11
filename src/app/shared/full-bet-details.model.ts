import { Bet } from "../sportsbook/bet-details.model";
import { match } from "./match-details.model";

export class fullBet{

    constructor(public betDetails: Bet, public matchDetails: match[]){
        this.betDetails = betDetails;
        this.matchDetails = matchDetails;
    }
    
}