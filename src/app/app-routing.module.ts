import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetListComponent } from './bets/bets-list/bet-list.component';
import { BetCreateComponent } from './bets/bets-create/bet-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
  { path: '', component: BetListComponent },
  { path: 'create', component: BetCreateComponent},
  { path: 'edit/:betId', component: BetCreateComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
