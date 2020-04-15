import { Component, OnInit } from '@angular/core';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component ({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  constructor(public authService: AuthService, public route: ActivatedRoute) {}
  authData: AuthData;
  private userId: string;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.userId = paramMap.get('userId');
      this.authService.getUser(this.userId).subscribe(postData => {
        this.authData = {
          email: postData.email,
          password: postData.password,
          firstname: postData.firstname,
          lastname: postData.lastname
        };
      });
    });
  }
}
