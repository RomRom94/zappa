import { Component } from '@angular/core';

@Component ({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.scss']
})

export class MenuSettingsComponent {
  public status = false;

  toToggle() {
    this.status = !this.status;
  }
}
