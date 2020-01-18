import { Component, Input } from '@angular/core';

import { Bet } from '../bet.model';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html'
})

export class BetListComponent {
  @Input() bets: Bet[] = [];
}
