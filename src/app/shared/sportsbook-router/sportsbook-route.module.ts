import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatchesListComponent } from "../../sportsbook/matches-list/matches-list.component";
import { SportsbookComponent } from "../../sportsbook/sportsbook.component";
import { CanDeactivateGuard } from "../../sportsbook/ticket/bet-place/can-deactivate-guard.service";


const routes: Routes = [
    { path: 'sportsbook', component: SportsbookComponent, canDeactivate: [CanDeactivateGuard], children: [
        { path: ':sport', component: MatchesListComponent },
    ]},
]

@NgModule({

    imports: [RouterModule.forChild(routes),    
    ],
    exports: [RouterModule]
})


export class SportsBookRouteModule {}