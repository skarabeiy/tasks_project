import {Component, NgZone} from '@angular/core';
import {AuthService} from "./common/auth/auth.service/auth.service";
import {Router} from "@angular/router";

import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tasks';

  someInterval;
  check: boolean = true;

  nameComponent = 'Max';
  hello = '';
  constructor(public authService: AuthService,
              private router: Router,
              private zone: NgZone,
              public translate: TranslateService
              ) {
    this.translate.stream('HOME.TITLE').subscribe(val => {
    this.hello = val;
  });

    this.zone.runOutsideAngular(() => {
      this.someInterval = setInterval(() => {

        }, 1000000) })}

  getRole(): string{
    return this.authService.getRole();
  }

  onChangeName(name: string) {
    this.nameComponent = name;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  ngOnInit() {
    if (this.authService.isTokenExpired()) {
      localStorage.clear()
    }

  }
}
