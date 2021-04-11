import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyBetsComponent } from './my-bets/my-bets.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatchesListComponent } from './sportsbook/matches-list/matches-list.component';
import { SportsbookComponent } from './sportsbook/sportsbook.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sportsbook', component: SportsbookComponent, children: [
    { path: ':sport', component: MatchesListComponent },
  ]},
  { path: 'betsHistory', component: MyBetsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo:'not-found' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
