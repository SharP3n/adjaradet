import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Account } from "../../../shared/account.model";
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({providedIn: 'root'})

export class MatchessService{
  // createAndStorePost(a: string, b: string){

  //   // const postData: Post = {username: '', email: '', password:''};

  //   this.http.post(
  //     'https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json',
  //       postData
  //   ).subscribe(responseData => {
  //     console.log(responseData)
  //   })
  // }

  // deletePosts(){
  //   return this.http.delete('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
  // }

  // fetchPosts(){
  //   return this.http.get<{[key: string]: Account}>('https://sportsbetting-e1417-default-rtdb.firebaseio.com/posts.json')
  //   .pipe(
  //     map(responseData => {
  //     const postsArr: Account[] = [];
  //     for(const key in responseData){
  //       postsArr.push({...responseData[key], id: key});
  //     }
  //     return postsArr;
  //   }),
  //   catchError(errorRes => {
  //     return throwError(errorRes); 
  //   })
  //   )
  // }

  constructor(private http: HttpClient){}
}