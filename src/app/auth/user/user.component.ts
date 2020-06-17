import { Component, OnInit } from '@angular/core';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component ({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  constructor(public authService: AuthService, public route: ActivatedRoute, public router: Router) {}
  authData: AuthData;
  private userId: string;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.userId = paramMap.get('userId');
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
    });
  }

  onUpdate(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.update(this.userId, form.value.email, form.value.password, form.value.firstname, form.value.lastname);
    this.router.navigate(['/']);
  }
}
