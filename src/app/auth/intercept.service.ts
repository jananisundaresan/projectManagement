import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http/src/response';
import { HttpRequest } from '@angular/common/http/src/request';
import { HttpHandler } from '@angular/common/http/src/backend';
import {AuthService} from './auth.service';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
@Injectable()// {providedIn: 'root'}

export class InterceptService  implements HttpInterceptor {

  constructor(private authService: AuthService, private cookieService: CookieService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ setHeaders: { 'Authorization': this.cookieService.get('idToken') } });
    return next.handle(authReq).pipe(
      tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authService.signOut();
        }
      }
    }));

}
}
