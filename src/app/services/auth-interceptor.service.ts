import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userName = localStorage.getItem('userName');
    if (localStorage.getItem('isAuthenticated') != null && userName != null) {
      request = request.clone({
        setHeaders: {
          UserName: userName,
        },
      });
      return next.handle(request);
    }
    return next.handle(request);
  }
}
