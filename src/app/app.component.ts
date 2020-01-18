import { Component } from '@angular/core';
import { Bet } from './bets/bet.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  storedBets: Bet[] = [];

  onBetAdded(bet) {
    this.storedBets.push(bet);
  }
}
