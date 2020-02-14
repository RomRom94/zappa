import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetListComponent } from './bets/bets-list/bet-list.component';
import { BetCreateComponent } from './bets/bets-create/bet-create.component';


const routes: Routes = [
  { path: '', component: BetListComponent },
  { path: 'create', component: BetCreateComponent},
  { path: 'edit/:betId', component: BetCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
