import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../auth.service/auth.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{

  constructor(private auth_service: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth_service.getToken()) {
      req = this.addToken(req, this.auth_service.getToken());
    }
    return next.handle(req).pipe(catchError(err => {return throwError(err)}));
  }

  addToken(request: HttpRequest<any>, token: string) {
    return request.clone( {
      setHeaders: {
        'Authorization': `Bearer_${token}`
      }
    });
  }
}
