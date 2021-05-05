import { NgModule } from '@angular/core'
import { SportsbookComponent } from '../sportsbook/sportsbook.component';
import { MatchesListComponent } from '../sportsbook/matches-list/matches-list.component';
import { TicketComponent } from '../sportsbook/matches-list/ticket/ticket.component';
import { MyBetsComponent } from '../my-bets/my-bets.component';
import { BetsHistoryComponent } from '../my-bets/bets-history/bets-history.component';
import { MatchesHeaderComponent } from '../sportsbook/matches-list/matches-header/matches-header.component';
import { MatchesItemComponent } from '../sportsbook/matches-list/matches-item/matches-item.component';
import { MatchOddsComponent } from '../sportsbook/matches-list/matches-item/match-odds/match-odds.component';
import { BetPlaceComponent } from '../sportsbook/matches-list/ticket/bet-place/bet-place.component';
import { MatchComponent } from '../sportsbook/matches-list/ticket/match/match.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from '../sportsbook/matches-list/matches-item/shorten.pipe';
import { SportsbettingRouteModule } from './sportsbetting-route.module';

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
        ShortenPipe
    ],
    imports: [
        SportsbettingRouteModule, CommonModule,
    ],
    exports: [
        RouterModule
    ]
})

export class SportsbettingModule {}