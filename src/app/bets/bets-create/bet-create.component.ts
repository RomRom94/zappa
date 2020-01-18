import { Component, EventEmitter, Output } from '@angular/core';

import { Bet } from '../bet.model';

@Component({
  selector: 'app-bet-create',
  templateUrl: './bet-create.component.html'
})
export class BetCreateComponent {
  betTitle = '';
  betContent = '';
  @Output() betCreated = new EventEmitter<Bet>();

  onAddBet() {
    const bet: Bet = {
      title: this.betTitle,
      content: this.betContent
    };
    this.betCreated.emit(bet);
  }
}
