import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BetDetailsService } from 'src/app/shared/bet-details.service';
import { fullBet } from 'src/app/shared/full-bet-details.model';

@Component({
  selector: 'app-bets-history',
  templateUrl: './bets-history.component.html',
  styleUrls: ['./bets-history.component.scss']
})
export class BetsHistoryComponent implements OnInit {

  constructor(private betDetailsService: BetDetailsService) {}

  placedBets: fullBet[] = [];

  ngOnInit(): void {//home, away, odd, betAmount, possWin

    this.placedBets = this.betDetailsService.getData();//observable
    
  }

}
