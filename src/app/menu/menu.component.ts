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
  authData: AuthData;

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.authService.getUser(this.userId).subscribe(async (response: any) => {
      this.authData = await response;
      if (response) {
        this.authData = {
          email: response.email,
          password: response.password,
          firstname: response.firstname,
          lastname: response.lastname
        };
      }
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
