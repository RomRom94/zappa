import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { BetsService } from '../bets.service';


@Component({
  selector: 'app-bet-create',
  templateUrl: './bet-create.component.html'
})
export class BetCreateComponent {
  title = '';
  content = '';
  constructor(public betsService: BetsService ) {}

  onAddBet(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.betsService.addBet(form.value.title, form.value.content);
    form.resetForm();
  }
}
