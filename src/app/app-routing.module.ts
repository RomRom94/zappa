import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetListComponent } from './bets/bets-list/bet-list.component';
import { BetCreateComponent } from './bets/bets-create/bet-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './auth/user/user.component';


const routes: Routes = [
  { path: '', component: BetListComponent },
  { path: 'create', component: BetCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:betId', component: BetCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'user/:userId', component: UserComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
