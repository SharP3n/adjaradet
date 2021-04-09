import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PicturesSliderComponent } from './home/pictures-slider/pictures-slider.component';
import { SportsPicturesComponent } from './home/sports-pictures/sports-pictures.component';
import { SportsbookComponent } from './sportsbook/sportsbook.component';
import { MatchesListComponent } from './sportsbook/matches-list/matches-list.component';
import { TicketComponent } from './sportsbook/ticket/ticket.component';
import { MyBetsComponent } from './my-bets/my-bets.component';
import { BetsHistoryComponent } from './my-bets/bets-history/bets-history.component';
import { FormsModule } from '@angular/forms';
import { BetDetailsService } from './shared/bet-details.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PicturesSliderComponent,
    SportsPicturesComponent,
    SportsbookComponent,
    MatchesListComponent,
    TicketComponent,
    MyBetsComponent,
    BetsHistoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [ BetDetailsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
