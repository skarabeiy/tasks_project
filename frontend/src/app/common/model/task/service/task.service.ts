import {Inject, Injectable} from '@angular/core';

import { Observable, of } from 'rxjs';

import { Task } from '../task';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import {catchError, tap} from 'rxjs/operators';
import {DOCUMENT} from "@angular/common";

@Injectable({ providedIn: 'root' })
export class TaskService {

  private tasksUrl : string=this.document.location.protocol+'//'+this.document.location.hostname+':8080/api/tasks/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
    ) {

  }
  /* GET heroes whose name contains search term */
  searchTasks(term: string): Observable<Task[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Task[]>(`${this.tasksUrl}search/${term}`).pipe(
      catchError(this.handleError<Task[]>('searchTasks', []))
    );

  }

  /** DELETE: delete the hero from the server */
  deleteTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}${task.id}`;
    return this.http.delete<Task>(url, this.httpOptions).pipe(
      catchError(this.handleError<Task>())
    );
  }

  /** POST: add a new hero to the server */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      catchError(this.handleError<Task>())
    );
  }

  /** GET heroes from the server */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(catchError(this.handleError<Task[]>())
      );
  }

  getLastCreatedTasks(): Observable<Task[]> {
    const url = `${this.tasksUrl}lastCreated`;
    return this.http.get<Task[]>(url)
      .pipe(catchError(this.handleError<Task[]>())
      );
  }
  getBestRatingTasks(): Observable<Task[]> {
    const url = `${this.tasksUrl}bestRating`;
    return this.http.get<Task[]>(url)
      .pipe(catchError(this.handleError<Task[]>())
      );
  }

  getTasksByUser(id: number): Observable<Task[]> {
    const url = `${this.tasksUrl}all/${id}`;
    return this.http.get<Task[]>(url)
      .pipe(catchError(this.handleError<Task[]>())
      );
  }


  /** GET hero!!!!!!!!!! by id. Will 404 if id not found !!!!!!!!!!!!!!!!!!!!*/
  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}${id}`;
    return this.http.get<Task>(url).pipe(
      catchError(this.handleError<Task>())
    );
  }
  /** PUT: update the hero on the server */
  updateTask(task: Task): Observable<any> {
    const url =`${this.tasksUrl}${task.id}`;
    return this.http.put(url, task, this.httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
