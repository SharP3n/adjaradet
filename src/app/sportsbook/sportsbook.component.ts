import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BetDetailsService } from '../shared/bet-details.service';
import { CanComponentDeactivate } from './ticket/bet-place/can-deactivate-guard.service';

@Component({
  selector: 'app-sportsbook',
  templateUrl: './sportsbook.component.html',
  styleUrls: ['./sportsbook.component.scss']
})
export class SportsbookComponent implements OnInit, CanComponentDeactivate{

  constructor(private betDetailsService: BetDetailsService){}

  creatingBet: boolean;

  canDeactivate()
  // : Observable<boolean> | Promise<boolean> | boolean
  {
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


