import { Component, OnInit } from '@angular/core';
import { FullBet } from 'src/app/shared/models/full-bet-details.model';
import { BetsHistoryService } from 'src/app/shared/services/bets-history.service';

@Component({
  selector: 'app-bets-history',
  templateUrl: './bets-history.component.html',
  styleUrls: ['./bets-history.component.scss']
})
export class BetsHistoryComponent implements OnInit {

  constructor( private betsHistoryService: BetsHistoryService) {}

  placedBets: FullBet[]= [];

  ngOnInit(): void {
    this.placedBets = this.betsHistoryService.getBets();
  }

}
