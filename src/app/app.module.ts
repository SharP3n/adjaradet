import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PicturesSliderComponent } from './home/pictures-slider/pictures-slider.component';
import { SportsPicturesComponent } from './home/sports-pictures/sports-pictures.component';
import { SportsbookComponent } from './sportsbook/sportsbook.component';
import { MatchesListComponent } from './sportsbook/matches-list/matches-list.component';
import { TicketComponent } from './sportsbook/matches-list/ticket/ticket.component';
import { MyBetsComponent } from './my-bets/my-bets.component';
import { BetsHistoryComponent } from './my-bets/bets-history/bets-history.component';
import { BetDetailsService } from './shared/bet-details.service';
import { CommonModule } from '@angular/common';
import { HighlightDirective} from './navbar/highlight.directive';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatchesHeaderComponent } from './sportsbook/matches-list/matches-header/matches-header.component';
import { MatchesItemComponent } from './sportsbook/matches-list/matches-item/matches-item.component';
import { MatchOddsComponent } from './sportsbook/matches-list/matches-item/match-odds/match-odds.component';
import { BetPlaceComponent } from './sportsbook/matches-list/ticket/bet-place/bet-place.component';
import { MatchComponent } from './sportsbook/matches-list/ticket/match/match.component';
import { LogInComponent } from './navbar/log-in/log-in.component';
import { FormsModule } from '@angular/forms';
import { ShortenPipe } from './sportsbook/matches-list/matches-item/shorten.pipe';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './navbar/log-in/message/message.component'

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
    HighlightDirective,
    NotFoundComponent,
    MatchesHeaderComponent,
    MatchesItemComponent,
    MatchOddsComponent,
    BetPlaceComponent,
    MatchComponent,
    LogInComponent,
    ShortenPipe,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ BetDetailsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
