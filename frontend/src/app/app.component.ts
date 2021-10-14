import {Component, NgZone} from '@angular/core';
import {AuthService} from "./common/auth/auth.service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tasks';


  someInterval;
  check: boolean = true;
  constructor(public authService: AuthService,
              private router: Router,
              private zone: NgZone
              ) {
    this.zone.runOutsideAngular(() => {
      this.someInterval = setInterval(() => {
        // if (this.getRole()=='MANAGER') {
        //   this.getInvoices();
        // }
        // if (this.getRole()=='DRIVER') {
        //   this.getWaybills();
        // }
        }, 1000000) })}

  getRole(): string{
    return this.authService.getRole();
  }


  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  ngOnInit() {
    if (this.authService.isTokenExpired()) {
      localStorage.clear()
    }
    // if (this.getRole()=='MANAGER') {
    //   this.getInvoices();
    // }
    // if (this.getRole()=='DRIVER') {
    //   this.getWaybills();
    // }
  }
}
