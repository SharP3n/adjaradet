import { Component, OnInit } from '@angular/core';
import { BetDetailsService } from '../shared/services/bet-details.service';
import { CanComponentDeactivate } from './ticket/bet-place/can-deactivate-guard.service';

@Component({
  selector: 'app-sportsbook',
  templateUrl: './sportsbook.component.html',
  styleUrls: ['./sportsbook.component.scss']
})
export class SportsbookComponent implements OnInit, CanComponentDeactivate{

  constructor(private betDetailsService: BetDetailsService){}

  creatingBet: boolean;

  canDeactivate(){
    if(this.creatingBet){
      return confirm('Do You Want To Stop Placing Bet?')
    }
    else{
      return true;
    }
  }  

  ngOnInit(){
    this.betDetailsService.creatingBet.subscribe((creatingBet: boolean)=>{
      this.creatingBet = creatingBet;
    })
  }

  

}


