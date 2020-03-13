import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { BetsService } from '../bets.service';
import { Bet } from '../bet.model';


@Component({
  selector: 'app-bet-create',
  templateUrl: './bet-create.component.html'
})
export class BetCreateComponent implements OnInit {
  title = '';
  content = '';
  bet: Bet;
  private mode = 'create';
  private betId: string;

  constructor(
    public betsService: BetsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('betId')) {
        this.mode = 'edit';
        this.betId = paramMap.get('betId');
        this.betsService.getBet(this.betId).subscribe(betData => {
          this.bet = {id: betData._id, title: betData.title, content: betData.content};
        });
      } else {
        this.mode = 'create';
        this.betId = null;
      }
    });
  }

  onSaveBet(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.betsService.addBet(form.value.title, form.value.content);
    } else {
      this.betsService.updateBet(
        this.betId,
        form.value.title,
        form.value.content
        );
    }
    form.resetForm();
  }
}
