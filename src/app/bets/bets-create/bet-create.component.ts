import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bet-create',
  templateUrl: './bet-create.component.html'
})
export class BetCreateComponent {
  betTitle = '';
  betContent = '';
  @Output() betCreated = new EventEmitter();

  onAddBet() {
    const bet = {
      title: this.betTitle,
      content: this.betContent
    };
    this.betCreated.emit(bet);
  }
}
