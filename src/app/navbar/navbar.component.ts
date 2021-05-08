import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BetDetailsService } from 'src/app/shared/bet-details.service';
import { AccountService } from '../shared/account.service';
import * as accountActions from './log-in/store/account.actions'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private betDetailsService: BetDetailsService,
              private accountService: AccountService,
              private store: Store<{accounts: Account[]}>) { }

  ngOnInit(): void {
    this.betDetailsService.betPlaced.subscribe(() =>{
      this.betsQuantity++;
    })
  }

  onOpenModal(purpose: string){
    this.accountService.toggleModal(true, purpose);

  }

  logOut(){
    this.accountService.logOut();
    this.store.dispatch(new accountActions.removeUser())
  }

  betsQuantity = 0;

}
