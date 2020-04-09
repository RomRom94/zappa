import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userIsAuthentificated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService) {}

  public signup = false;
  public buttonName: any = 'Inscris toi ici !';
  public buttonText: any = 'Pas encore inscris ?';

  ngOnInit() {
    this.authService.autoAuthUser();
    this.userIsAuthentificated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthentificated => {
      this.userIsAuthentificated = isAuthentificated;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  toggle() {
    this.signup = !this.signup;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.signup) {
      this.buttonText = 'Déjà inscris ?';
      this.buttonName = 'Connectes toi ici';
    } else {
      this.buttonText = 'Pas encore inscris ?';
      this.buttonName = 'Inscris toi ici !';
    }
  }
}
