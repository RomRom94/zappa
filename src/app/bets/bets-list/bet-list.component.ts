import { Component, OnInit, OnDestroy } from '@angular/core';

import { Bet } from '../bet.model';
import { BetsService } from '../bets.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html'
})

export class BetListComponent implements OnInit, OnDestroy {
  bets: Bet[] = [];
  private betsSub: Subscription;

  constructor(public betsService: BetsService) {}

  ngOnInit() {
    this.bets = this.betsService.getBets();
    this.betsSub = this.betsService.getBetUpdateListener().subscribe((bets: Bet[]) => {
      this.bets = bets;
    });
  }

  ngOnDestroy() {
    this.betsSub.unsubscribe();
  }
}
