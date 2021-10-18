import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DOCUMENT} from "@angular/common";
import {Observable, of} from "rxjs";

import {catchError} from "rxjs/operators";
import {User} from "../../model/user/user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private usersUrl : string=this.document.location.protocol+'//'+this.document.location.hostname+':8080/api/admin/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(catchError(this.handleError<User[]>())
      );
  }







  private handleError<U>(operation = 'operation', result?: U) {
    return (error: any): Observable<U> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as U);
    };
  }
}
