import { HttpClient } from '@angular/common/http';
import { ComponentFactoryResolver, EventEmitter, Injectable, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from './account.model';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MessageComponent } from '../navbar/log-in/message/message.component'
import { PlaceholderDirective } from './placeholder.directive';

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

export class AccountService implements OnInit {

  
  @ViewChild(PlaceholderDirective, {static: false}) messageHost: PlaceholderDirective; 
   
  signup(email: string, password: string){
    return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChqR-cUB1DmNV5sGf77yrpdeu0_gNa-LY',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    )
    // .pipe(catchError(error => {

    // }))
  }

  logIn(email: string, password: string){
    return this.http.post<authResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChqR-cUB1DmNV5sGf77yrpdeu0_gNa-LY',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
  }

  logOut(){
    this.message.emit('Logged Out');
    // const messageCmpFactory = this.componentFactoryRes.resolveComponentFactory(MessageComponent)
    // const hostViewContainerRef = this.messageHost.viewContainerRef;
    // hostViewContainerRef.clear();

    // hostViewContainerRef.createComponent(messageCmpFactory)
  }
  
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
  
  
  displayModal = new EventEmitter<{displayModal: boolean, action: string}>()
  message = new EventEmitter<string>();

  toggleModal(displayModal: boolean, action: string){
    this.displayModal.emit({displayModal: displayModal, action: action});
  }

  
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

  accountsArr: Account[] = [];

  //store accountsArr in firebase++
  //get accountsArr from firebase++
  //assign to accountsArr
  //compare it to log in 

  StoreAccounts(account: Account){

    //delete, post again

    this.deletePosts();
    console.log(this.accountsArr)
    this.accountsArr.push(account);
    console.log(this.accountsArr);

    this.http.post(
      'https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json',
      this.accountsArr
    ).subscribe(responseData => {
      console.log(responseData)
    })
  }

  deletePosts(){
    this.http.delete('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
  }

  fetchAccounts(){
    return this.http.get<{[key: string]: Account}>('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      map(responseData => {
      const postsArr: Account[] = [];
      for(const key in responseData){
        postsArr.push({...responseData[key], id: key});
      }
      return postsArr;
    }),

    // catchError(errorRes => {
    //   return throwError(errorRes); 
    // })
    )
  }

















  ngOnInit(){
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



  constructor(private http: HttpClient, private componentFactoryRes: ComponentFactoryResolver) { }
}
