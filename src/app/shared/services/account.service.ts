import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Store } from '@ngrx/store';
import * as accountActions from '../store/account.actions'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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

  message = new Subject<{message: string, error: boolean}>();

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
    localStorage.setItem('userData', null);
    if(this.router.url === '/betsHistory' || this.router.url === '/account-info'){
      this.router.navigate(['/'])
    }
  }
  displayModal = new Subject<{displayModal: boolean, action: string}>()

  toggleModal(displayModal: boolean, action: string){
    this.displayModal.next({displayModal: displayModal, action: action});
  }

  saveLogInData(account: Account){
    if(account){
      localStorage.setItem('userData', JSON.stringify(account))
      this.loggedIn = true;
    }
  }

  counter = 0;
  constructor(private http: HttpClient, private store: Store<{account: Account}>, private router: Router) { 

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
    this.store.dispatch(new accountActions.changeUser({email: userData.email, password: userData.password, balance: 10}))
    this.loggedIn = true;
  }
  

}
