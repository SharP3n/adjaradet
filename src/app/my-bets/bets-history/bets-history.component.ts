import { Component, OnInit } from '@angular/core';
import { BetDetailsService } from 'src/app/shared/bet-details.service';
import { FullBet } from 'src/app/shared/full-bet-details.model';

@Component({
  selector: 'app-bets-history',
  templateUrl: './bets-history.component.html',
  styleUrls: ['./bets-history.component.scss']
})
export class BetsHistoryComponent implements OnInit {

  constructor(private betDetailsService: BetDetailsService) {}

  placedBets: FullBet[] = [];

  ngOnInit(): void {
    this.placedBets = this.betDetailsService.getData();
  }

}
