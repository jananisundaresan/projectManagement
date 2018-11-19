import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private cookieService: CookieService
  ) { }

  //if the user is not authenticated , the user is redirected to login page
  canActivate(): boolean {
    if (!this.cookieService.check('auth')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
