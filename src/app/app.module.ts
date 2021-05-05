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

import { LogInComponent } from './navbar/log-in/log-in.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { MessageComponent } from './navbar/log-in/message/message.component'
import { PlaceholderDirective } from './shared/placeholder.directive';
import { SportsbettingModule } from './shared/sportsbetting.module';
import { CoreModule } from './core.module';
import { SportsbettingRouteModule } from './shared/sportsbetting-route.module';

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
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    SportsbettingModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


