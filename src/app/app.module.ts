import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PicturesSliderComponent } from './home/pictures-slider/pictures-slider.component';
import { SportsPicturesComponent } from './home/sports-pictures/sports-pictures.component';
import { CommonModule } from '@angular/common';
import { HighlightDirective} from './navbar/highlight.directive';
import { NotFoundComponent } from './not-found/not-found.component';
import { LogInComponent } from './navbar/modal/log-in/log-in.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { MessageComponent } from './navbar/message/message.component'

import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { accountReducer } from './navbar/modal/log-in/store/account.reducer';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AccountInfoComponent } from './navbar/account-info/account-info.component';
import { RegisterComponent } from './navbar/modal/register/register.component';
import { ModalComponent } from './navbar/modal/modal.component';
import { SportsBookModule } from './shared/sportsbook-router/sportsbook.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PicturesSliderComponent,
    SportsPicturesComponent,
    NotFoundComponent,
    LogInComponent,
    MessageComponent,
    HighlightDirective,
    AccountInfoComponent,
    RegisterComponent,
    ModalComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SportsBookModule,
    StoreModule.forRoot({account: accountReducer}),
    CommonModule,

    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


