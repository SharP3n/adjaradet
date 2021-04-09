import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyBetsComponent } from './my-bets/my-bets.component';
import { SportsbookComponent } from './sportsbook/sportsbook.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sportsbook', component: SportsbookComponent },
  { path: 'betsHistory', component: MyBetsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
