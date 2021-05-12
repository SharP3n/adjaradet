import { HttpClient } from '@angular/common/http';
import { ComponentFactoryResolver, EventEmitter, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from './account.model';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MessageComponent } from '../navbar/message/message.component'
import { Store } from '@ngrx/store';
import * as accountActions from '../navbar/modal/log-in/store/account.actions'
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

interface authResponse{//this gets returned somewhere(maybe), so if I need it i can use it (maybe)
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

export class AccountService implements OnInit {

  // @ViewChild(PlaceholderDirective, {static: false}) messageHost: PlaceholderDirective; 

  accountData = new EventEmitter<Account>();
  message = new EventEmitter<{message: string, error: boolean}>();

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
    
    // .pipe(catchError(error => {
    //   return throwError(error);
    //   // this.message.emit(error)
    // }))
  }

  loggedIn: boolean;
  logOut(){
    this.store.dispatch(new accountActions.removeUser())
    this.loggedIn = false;
    localStorage.setItem('userData', null);
    if(this.router.url === '/betsHistory' || this.router.url === '/account-info'){
      this.router.navigate(['/'])
    }


    // const messageCmpFactory = this.componentFactoryRes.resolveComponentFactory(MessageComponent)
    // const hostViewContainerRef = this.messageHost.viewContainerRef;
    // hostViewContainerRef.clear();

    // hostViewContainerRef.createComponent(messageCmpFactory)
  }
  
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
  
  displayModal = new EventEmitter<{displayModal: boolean, action: string}>()

  toggleModal(displayModal: boolean, action: string){
    this.displayModal.emit({displayModal: displayModal, action: action});
  }

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

  // accountsArr: Account[] = [];

  // StoreAccounts(account: Account){
  //   this.message.emit('heloooo ' + account.username);

  //   this.deletePosts();
  //   this.accountsArr.push(account);

  //   this.http.post(
  //     'https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json',
  //     this.accountsArr
  //   ).subscribe(responseData => {
  //     console.log(responseData)
  //   }, error => {
  //     console.log(error)
  //   })
  // }

  // deletePosts(){
  //   this.http.delete('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
  // }

  // fetchAccounts(){
  //   return this.http.get<{[key: string]: Account}>('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
  //   .pipe(
  //     map(responseData => {
  //     const postsArr: Account[] = [];
  //     for(const key in responseData){
  //       postsArr.push({...responseData[key], id: key});
  //     }
  //     return postsArr;
  //   }, error => {
  //     console.log(error)
  //   }
  //   ),

  //   catchError(errorRes => {
  //     // console.log('errrrrr' + errorRes) 
  //     return throwError(errorRes);
  //   })
  //   )
  // }


  saveLogInData(account: Account){
    if(account){
      localStorage.setItem('userData', JSON.stringify(account))
      this.loggedIn = true;
    }
  }

  counter = 0;
  constructor(private http: HttpClient, private componentFactoryRes: ComponentFactoryResolver, private store: Store<{account: Account}>, private router: Router) { 

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
    // setTimeout(() => {
    //   this.message.emit({message:`welcome back ${userData.email}`, error: false});
    // }, 2000);
    this.loggedIn = true;
  }
  

  ngOnInit(){
    // this.store.select('account').subscribe((account)=>{
    //   console.log(account)
    //   this.account = account;
    // })


    // this.accountsArr = this.fetchAccounts()
    // console.log(this.accountsArr)
    // console.log(this.fetchAccounts())
  }

  // createAndStorePost(newAcc: {username: string, email: string, password: string}){
  //   this.deletePosts();
  //   // this.accountsArr.push(newAcc);

  //   this.http.post(
  //     'https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json',
  //       this.accountsArr
  //   ).subscribe(responseData => {
  //     console.log(responseData)
  //   })
  // }

  // deletePosts(){
  //   // return this.http.delete('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
  //   this.http.delete('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
  // }

  // fetchPosts(){
  //   return this.http.get<{[key: string]: Post}>('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
  //   .pipe(
  //     map(responseData => {
  //     const postsArr: Post[] = [];
  //     for(const key in responseData){
  //       postsArr.push({...responseData[key], id: key});
  //     }
  //     return postsArr;
  //   }))
  // }

  // checkIfUserExists(form: {username: string, password: string, email: string}){
  //   console.log(form);
    
  // }


}
