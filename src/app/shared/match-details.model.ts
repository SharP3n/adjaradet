// export class match{

//     constructor(public home: string, public away: string, public bettingOn: string, public id: number){
//         this.home = home;
//         this.away = away;
//         this.bettingOn = bettingOn;
//         this.id = id;
//     }
    
// }
export interface Match{
    home: string;
    away: string;
    homeOdd?: number;
    awayOdd?: number;
    id?: string
    bettingOn?: string;
    addedToBet?: boolean;
    
}