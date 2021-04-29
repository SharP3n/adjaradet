import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ButtonHighlightService } from '../button-highlight.service';
import { DataService } from '../data.service';
import { NewMatchService } from '../new-match.service';
import { map } from 'rxjs/operators';
import { Account } from '../../../shared/account.model';
import { MatchessService } from './matches.service';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-matches-item',
  templateUrl: './matches-item.component.html',
  styleUrls: ['./matches-item.component.scss']
})
export class MatchesItemComponent implements OnInit {

  constructor( private accountService: AccountService, private MatchesService: MatchessService, private dataService: DataService, private http: HttpClient) { }

  isFetcheing = false;
  
  ngOnInit(): void {
    this.isFetcheing = true;
    // this.postsService.fetchPosts;
    
    // this.postsService.fetchPosts().subscribe(posts => {
    //   this.isFetcheing = false;
    //   this.loadedPosts = posts;
    // })

  }

  onChreatePost(postData: {a: string, b: string}){
    // this.postsService.createAndStorePost(postData.a, postData.b);
  }

  onFetchPost(){
    // this.isFetcheing = true;
    // // this.postsService.fetchPosts;
    // this.postsService.fetchPosts().subscribe(posts => {
    //   this.isFetcheing = false;
    //   this.loadedPosts = posts;
    //   console.log(posts)
    // }
    // ,() => {
    //   this.isFetcheing = false; 
    //   this.accountService.message.emit('Error Occurred, Check Network Connection')//customize errors
    // });
  }
  
  error = null;
  
  onClearPosts(){
    // this.postsService.deletePosts().subscribe(() => {
    //   // this.loadedPosts = [];
    // }, () => {
    //     this.accountService.message.emit('Error Occurred, Check Network Connection')//customize errors
    // });
  }

  loadedPosts: Account[] = [];

  @Input() match: {home: string, away: string, homeOdd: number, awayOdd: number};

}
