import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from "../auth.service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{

  constructor(
    private router: Router,
    private authService: AuthService) {}


  canActivate(){
    if (this.authService.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
