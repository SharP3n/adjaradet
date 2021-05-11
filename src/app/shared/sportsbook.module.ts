import { NgModule } from '@angular/core'
import { SportsbookComponent } from '../sportsbook/sportsbook.component';
import { MatchesListComponent } from '../sportsbook/matches-list/matches-list.component';
import { TicketComponent } from '../sportsbook/ticket/ticket.component';
import { MyBetsComponent } from '../my-bets/my-bets.component';
import { BetsHistoryComponent } from '../my-bets/bets-history/bets-history.component';
import { MatchesHeaderComponent } from '../sportsbook/matches-list/matches-header/matches-header.component';
import { MatchesItemComponent } from '../sportsbook/matches-list/matches-item/matches-item.component';
import { MatchOddsComponent } from '../sportsbook/matches-list/matches-item/match-odds/match-odds.component';
import { BetPlaceComponent } from '../sportsbook/ticket/bet-place/bet-place.component';
import { MatchComponent } from '../sportsbook/ticket/match/match.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../sportsbook/matches-list/matches-item/shorten.pipe';
import { SportsBookRouteModule } from './sportsbook-route.module';
import { OddsHighlightDirective } from '../sportsbook/matches-list/matches-item/match-odds/odds-highlight.directive';

@NgModule({
    declarations: [
        SportsbookComponent,
        MatchesListComponent,
        TicketComponent,
        MyBetsComponent,
        BetsHistoryComponent,
        MatchesHeaderComponent,
        MatchesItemComponent,
        MatchOddsComponent,
        BetPlaceComponent,
        MatchComponent,
        ShortenPipe,
        OddsHighlightDirective,
    ],
    imports: [
        SportsBookRouteModule, CommonModule,
    ],
    exports: [
        RouterModule
    ]
})

export class SportsBookModule {}