import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  public bets = true;
  public settings = false;
  public friends = false;

  toggleBets() {
    this.bets = true;
    this.settings = false;
    this.friends = false;
  }

  toggleSettings() {
    this.bets = false;
    this.settings = true;
    this.friends = false;
  }

  toggleFriends() {
    this.bets = false;
    this.settings = false;
    this.friends = true;
  }
}
