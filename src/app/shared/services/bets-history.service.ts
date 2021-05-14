import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FullBet } from '../models/full-bet-details.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class BetsHistoryService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  addBetsInDB(email: string, bet: FullBet){
    return this.http.post('https://bets-history-default-rtdb.europe-west1.firebasedatabase.app/bets-history.json', 
    {
      email: email,
      bet: bet
    })
  }
  
  getBetsHistory(){
    return this.http.get('https://bets-history-default-rtdb.europe-west1.firebasedatabase.app/bets-history.json')
    .pipe(
      map((balanceData) => {
        const postsArr = [];
        for(const key in balanceData){
          postsArr.push(balanceData[key]);
        }
        return postsArr
      })
    )
  }

  betsUpdated = new Subject<number>();
  allBets: FullBet[] = []

  StoreAccountBets(email: string){

    this.getBetsHistory().subscribe(bets => {
      bets.forEach(specific => {
        if(specific.email === email){
          this.allBets.push(specific)
        }
      });

      this.betsUpdated.next(this.allBets.length)
    }, () => {
      this.messageService.message.next({message: 'something went wrong, Check your connection', error: true})
    });
  }

  getBets(){
    return this.allBets
  }

}

