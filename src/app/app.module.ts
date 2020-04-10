import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BetCreateComponent } from './bets/bets-create/bet-create.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { BetListComponent } from './bets/bets-list/bet-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { MenuSettingsComponent } from './menu/menu-settings/menu-settings.component';
import { MenuFriendsComponent } from './menu/menu-friends/menu-friends.component';
import { UserComponent } from './auth/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    BetCreateComponent,
    HeaderComponent,
    BetListComponent,
    LoginComponent,
    SignupComponent,
    MenuComponent,
    MenuSettingsComponent,
    MenuFriendsComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
