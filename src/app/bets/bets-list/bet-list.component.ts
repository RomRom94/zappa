import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html'
})

export class BetListComponent {
  @Input() bets = [];
}
