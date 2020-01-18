import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Bet } from '../bet.model';


@Component({
  selector: 'app-bet-create',
  templateUrl: './bet-create.component.html'
})
export class BetCreateComponent {
  title = '';
  content = '';
  @Output() betCreated = new EventEmitter<Bet>();

  onAddBet(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const bet: Bet = {
      title: form.value.title,
      content: form.value.content
    };
    this.betCreated.emit(bet);
  }
}
