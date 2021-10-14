import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Task} from "../../task/task";
import {catchError} from "rxjs/operators";
import {Achievements} from "../achievements";

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  private achievementsUrl : string=this.document.location.protocol+'//'+this.document.location.hostname+':8080/api/user/';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) { }

  getAchievements(id: number): Observable<Achievements> {
    const url = `${this.achievementsUrl}${id}/achievements`;
    return this.http.get<Achievements>(url)
      .pipe(catchError(this.handleError<Achievements>())
      );
  }

  private handleError<A>(operation = 'operation', result?: A) {
      return (error: any): Observable<A> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // Let the app keep running by returning an empty result.
        return of(result as A);
      };
    }
}
