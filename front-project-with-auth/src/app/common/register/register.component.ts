import { Component, OnInit } from '@angular/core';
import {UserForLogin} from "../model/user/userForLogin";
import {AuthService} from "../auth/auth.service/auth.service";
import {RegisterService} from "./service/register.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public hasError: boolean = false;
  constructor(private registerService: RegisterService,
              private location: Location) { }

  ngOnInit(): void {
  }

  register(name: string, password: string): void {
    const user: UserForLogin = {name,password};
    this.registerService.register(user)
      .subscribe(data => {
        this.navigateToMainPageIfAuth();
      });
  }
  navigateToMainPageIfAuth(): void {
    this.location.go('/login');  //
    location.reload();
  }
}
