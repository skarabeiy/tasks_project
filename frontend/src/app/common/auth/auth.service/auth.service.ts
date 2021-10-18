import {Inject, Injectable} from '@angular/core';
//import * as jwt_decode from 'jwt-decode';
//import jwt_decode from 'jwt-decode';
 import jwt_decode from "jwt-decode";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserForLogin} from "../../model/user/userForLogin";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {DOCUMENT} from "@angular/common";
import jwtDecode from "jwt-decode";


export const TOKEN_NAME: string ='jwt_token';
export const ROLE_NAME: string ='role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url: string=this.document.location.protocol + '//' + this.document.location.hostname + ':8080/api/auth/login';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: Document) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }

  getToken():string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string ): void {
    localStorage.setItem(TOKEN_NAME, token);
    localStorage.setItem(ROLE_NAME,this.getDecodedAccessToken(token).roles[0]);
  }

  getRole(): string {
    return localStorage.getItem(ROLE_NAME);
  }

  getTokenExpirationDate(token: string): Date{
    //const decoded = jwt_decode(token);
    const decoded = this.getDecodedAccessToken(token);
    //if (decoded.exp=== undefined) return null;
    if(decoded.exp === undefined) return null;
    const date = new Date(0);
    //date.setUTCSeconds(decoded.exp);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  login(user: UserForLogin): Observable<any> {
    return this.http.post(this.url, user, this.httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }
}
