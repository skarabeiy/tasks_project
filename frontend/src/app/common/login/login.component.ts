import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service/auth.service";
import {UserForLogin} from "../model/user/userForLogin";
import {Router} from "@angular/router";
import { Location} from "@angular/common";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public hasError: boolean = false;
  constructor(private authService: AuthService,
              private router: Router,
              private location: Location) { }

  login(name: string, password: string): void {
    const user: UserForLogin = {name,password};
    this.authService.login(user)
      .subscribe(data => {
        this.authService.setToken(data.token);
        if (!this.authService.isTokenExpired(data.token)) {
          this.navigateToMainPageIfAuth();
        } else {
          this.hasError =true;
        }
      });
  }

  navigateToMainPageIfAuth(): void {
    this.location.go('/personalPage');  //
    location.reload();
  }

  ngOnInit() {
    if (!this.authService.isTokenExpired()) {
      this.navigateToMainPageIfAuth();
    }
    if (this.authService.isTokenExpired()) {
      localStorage.clear()
    }
  }

}
