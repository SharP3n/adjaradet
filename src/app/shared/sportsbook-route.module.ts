import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatchesListComponent } from "../sportsbook/matches-list/matches-list.component";
import { SportsbookComponent } from "../sportsbook/sportsbook.component";


const routes: Routes = [
    { path: 'sportsbook', component: SportsbookComponent, children: [
        { path: ':sport', component: MatchesListComponent },
    ]},
]

@NgModule({

    imports: [RouterModule.forChild(routes),    
    ],
    exports: [RouterModule]
})


export class SportsBookRouteModule {}