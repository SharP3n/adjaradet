import { NgModule } from "@angular/core";
import { AuthGuard } from "./shared/auth-guard.service";
import { BetDetailsService } from './shared/bet-details.service';

@NgModule({
    providers: [ BetDetailsService, AuthGuard ],
})

export class CoreModule {}