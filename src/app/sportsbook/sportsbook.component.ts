import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BetDetailsService } from '../shared/services/bet-details.service';
import { CanComponentDeactivate } from './ticket/bet-place/can-deactivate-guard.service';

@Component({
  selector: 'app-sportsbook',
  templateUrl: './sportsbook.component.html',
  styleUrls: ['./sportsbook.component.scss']
})

export class SportsbookComponent implements OnInit, CanComponentDeactivate, OnDestroy{

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

  private activatedSub: Subscription;

  ngOnInit(){

    

    this.activatedSub = this.betDetailsService.creatingBet.subscribe((creatingBet: boolean)=>{
      this.creatingBet = creatingBet;
    })
  }

  ngOnDestroy(){
    this.activatedSub.unsubscribe();
  }

}


