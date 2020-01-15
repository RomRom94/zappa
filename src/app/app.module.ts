import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BetCreateComponent } from './bets/bets-create/bet-create.component';
import { BetListComponent } from './bets/bets-list/bet-list.component';


@NgModule({
  declarations: [
    AppComponent,
    BetCreateComponent,
    BetListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
