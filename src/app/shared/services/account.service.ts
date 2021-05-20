import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Store } from '@ngrx/store';
import * as accountActions from '../store/account.actions'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BalanceService } from './balance.service';
import { BetsHistoryService } from './bets-history.service';

interface authResponse{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AccountService{

  signup(email: string, password: string){
    return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChqR-cUB1DmNV5sGf77yrpdeu0_gNa-LY',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    )
  }

  logIn(email: string, password: string){
    return this.http.post<authResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChqR-cUB1DmNV5sGf77yrpdeu0_gNa-LY',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
  }

  loggedIn: boolean;
  logOut(){
    this.store.dispatch(new accountActions.removeUser())
    this.loggedIn = false;
    this.betsHistoryService.allBets = []
    localStorage.setItem('userData', null);
    if(this.router.url === '/betsHistory' || this.router.url === '/account-info'){
      this.router.navigate(['/'])
    }
  }
  displayModal = new Subject<{displayModal: boolean, purpose: string}>()

  toggleModal(displayModal: boolean, purpose: string){
    this.displayModal.next({displayModal: displayModal, purpose: purpose});
  }

  saveLogInData(account: Account){
    if(account){
      localStorage.setItem('userData', JSON.stringify(account))
      this.loggedIn = true;
    }
  }

  counter = 0;
  constructor(
    private http: HttpClient, 
    private store: Store<{account: Account}>, 
    private router: Router,
    private balanceService: BalanceService,
    private betsHistoryService: BetsHistoryService,
  ) { 
    this.store.select('account').subscribe((account)=>{
      if(this.counter > 0){
        this.saveLogInData(account);
      }
    })
    this.counter++;
  }
  account: Account;

  autoLogIn(){
    const userData = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      return
    }
    this.store.dispatch(new accountActions.changeUser({email: userData.email, password: userData.password, balance: null, placingBet: false}))
    this.balanceService.StoreAccountBalance(userData.email)
    this.betsHistoryService.StoreAccountBets(userData.email)
    this.loggedIn = true;
  }
  

}
