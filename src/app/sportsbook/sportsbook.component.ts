import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sportsbook',
  templateUrl: './sportsbook.component.html',
  styleUrls: ['./sportsbook.component.scss']
})
export class SportsbookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  betDetails: object;

  betPlaced(e){
    this.betDetails = e;
  }

}
