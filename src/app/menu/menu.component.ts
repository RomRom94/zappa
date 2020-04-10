import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  constructor(private authService: AuthService) {}

  userIsAuthentificated = false;
  userId: string;
  public bets = true;
  public settings = false;
  public friends = false;
  private authStatusSub: Subscription;
  authData: AuthData;

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userIsAuthentificated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthentificated => {
      this.userIsAuthentificated = isAuthentificated;
      this.userId = this.authService.getUserId();
    });
  }

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
