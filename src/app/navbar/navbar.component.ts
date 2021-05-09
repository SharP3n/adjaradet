import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BetDetailsService } from 'src/app/shared/bet-details.service';
import { AccountService } from '../shared/account.service';
import * as accountActions from './modal/log-in/store/account.actions'

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

    this.account = this.store.select('accounts');
  }

  account: Observable<Account[]>

  onOpenModal(purpose: string){
    this.accountService.toggleModal(true, purpose);
  }

  logOut(){
    this.accountService.logOut();
    this.store.dispatch(new accountActions.removeUser())
  }

  betsQuantity = 0;

}
