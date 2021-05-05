import { Component, OnInit } from '@angular/core';
import { BetDetailsService } from 'src/app/shared/bet-details.service';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private betDetailsService: BetDetailsService, private accountService: AccountService) { }

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
  }

  betsQuantity = 0;

}
