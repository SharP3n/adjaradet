import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Account } from '../models/account.model';
import * as accountActions from '../store/account.actions'
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  addBalanceInDB(email: string, balance: number){
    return this.http.post('https://balances-933a3-default-rtdb.europe-west1.firebasedatabase.app/balances.json', 
    {
      email: email,
      balance: balance
    })
  }

  changeBalance(email: string, balance: number){
    return this.getBalances().subscribe((balanceData)=>{
      balanceData.forEach((specificUser, i) => {
        if(specificUser.email === email){
          balanceData[i].balance = balance;
        }
      });
      this.updateBalanceInDB(balanceData).subscribe(()=>{
      }, () => {
        this.messageService.message.next({message: 'something went wrong, Check your connection', error: true})
      })
    }, ()=> {
      this.messageService.message.next({message: 'something went wrong, Check your connection', error: true})
    })
  }

  updateBalanceInDB(balanceData){
    return this.http.put('https://balances-933a3-default-rtdb.europe-west1.firebasedatabase.app/balances.json', 
    balanceData)
  }

  getBalances(){
    return this.http.get('https://balances-933a3-default-rtdb.europe-west1.firebasedatabase.app/balances.json').pipe(
      map((balanceData) => {
        const postsArr = [];
        for(const key in balanceData){
          postsArr.push(balanceData[key]);
        }
        return postsArr
      })
    )
  }

  StoreAccountBalance(email: string){

    this.getBalances().subscribe(balanceData => {
      balanceData.forEach(specific => {
        if(specific.email === email){
          this.store.dispatch(new accountActions.updateBalance(specific.balance))
        }
      });
    }, () => {
      this.messageService.message.next({message: 'something went wrong, Check your connection', error: true})
    });
  }

  constructor(private http: HttpClient, private store: Store<{account: Account}>, private messageService: MessageService) {
    
  }
}

