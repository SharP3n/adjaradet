import { Component, OnInit } from '@angular/core';
import { BetDetailsService } from 'src/app/shared/bet-details.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private betDetailsService: BetDetailsService) { }

  ngOnInit(): void {
    this.betDetailsService.betPlaced.subscribe(() =>{
      this.betsQuantity++;
    })
  }

  betsQuantity = 0;

}
