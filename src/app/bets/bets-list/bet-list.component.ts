import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Bet } from '../bet.model';
import { BetsService } from '../bets.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.scss'],
})

export class BetListComponent implements OnInit, OnDestroy {
  bets: Bet[] = [];
  userIsAuthentificated = false;
  userId: string;
  private betsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public betsService: BetsService, private authService: AuthService) {}

  ngOnInit() {
    this.betsService.getBets();
    this.userId = this.authService.getUserId();
    this.betsSub = this.betsService.getBetUpdateListener()
      .subscribe((bets: Bet[]) => {
      this.bets = bets;
    });
    this.userIsAuthentificated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthentificated => {
      this.userIsAuthentificated = isAuthentificated;
      this.userId = this.authService.getUserId();
    });
  }

  onDelete(betId: string) {
    this.betsService.deleteBet(betId);
  }

  ngOnDestroy() {
    // this.betsSub.unsubscribe();
    // this.authStatusSub.unsubscribe();
  }
}
