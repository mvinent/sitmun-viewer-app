import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService<unknown>,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authenticationService.isLoggedIn()) {
      req = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${this.authenticationService.getLoggedToken()}`
        )
      });
    }
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        // Handle 401 Unauthorized
        if (err.status === 401) {
          if (this.authenticationService.isLoggedIn()) {
            // const currentPath = this.router.url;
            // TODO mensaxe en paxina de login? Caducou a sua sesión volva a logearse?
            // TOOD redirect á url previa?
            this.authenticationService.logout();
          }
        }

        // Let the app keep running by returning an empty result
        return throwError(err);
      })
    );
  }
}