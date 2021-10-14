import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DOCUMENT} from "@angular/common";
import {Task} from "../../task/task";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Rating} from "../rating";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private ratingUrl: string = this.document.location.protocol + '//' + this.document.location.hostname + ':8080/api/ratings/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {

  }
  setRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(this.ratingUrl, rating, this.httpOptions).pipe(
      catchError(this.handleError<Rating>())
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
