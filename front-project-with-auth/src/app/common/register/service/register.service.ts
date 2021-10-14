import {Inject, Injectable} from '@angular/core';
import {UserForLogin} from "../../model/user/userForLogin";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url: string=this.document.location.protocol + '//' + this.document.location.hostname + ':8080/api/users/';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: Document) { }

  register(user: UserForLogin): Observable<any> {
    return this.http.post(this.url, user, this.httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
