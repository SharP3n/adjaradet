import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Account } from '../shared/models/account.model';
import { BetDetailsService } from '../shared/services/bet-details.service';
import { CanComponentDeactivate } from './ticket/bet-place/can-deactivate-guard.service';

@Component({
  selector: 'app-sportsbook',
  templateUrl: './sportsbook.component.html',
  styleUrls: ['./sportsbook.component.scss']
})

export class SportsbookComponent implements OnInit, CanComponentDeactivate, OnDestroy{

  constructor(
    private betDetailsService: BetDetailsService,
    private store: Store<{account: Account}>,
  ){}

  canDeactivate(){
    if(this.account.placingBet){
      return confirm('Do You Want To Stop Placing Bet?')
    }
    else{
      return true;
    }
  }  

  private activatedSub: Subscription;
  account: Account;

  ngOnInit(){

    this.activatedSub = this.store.select('account').subscribe(account=>{
      this.account = account;
    })

  }

  ngOnDestroy(){
    this.activatedSub.unsubscribe();
  }

}


