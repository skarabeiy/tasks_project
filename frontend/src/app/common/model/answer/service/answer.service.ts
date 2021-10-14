import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DOCUMENT} from "@angular/common";
import {Observable, of} from "rxjs";
import {Rating} from "../../rating/rating";
import {catchError} from "rxjs/operators";
import {Answer} from "../answer";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private answerUrl: string = this.document.location.protocol + '//' + this.document.location.hostname + ':8080/api/answers/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {
  }

  setAnswer(answer: Answer): Observable<Answer> {

    return this.http.post<Answer>(this.answerUrl, answer, this.httpOptions).pipe(
      catchError(this.handleError<Answer>())
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
