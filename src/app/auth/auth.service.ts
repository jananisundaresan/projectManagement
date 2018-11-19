import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import { map, tap, catchError } from 'rxjs/operators';
import Amplify, { Auth } from 'aws-amplify';
import {UserModel, SignModel} from '../login/login.model';
import {CookieService} from 'ngx-cookie-service';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser,AuthenticationDetails } from 'amazon-cognito-identity-js';
@Injectable()
export class AuthService {

  public loggedIn: BehaviorSubject<boolean>;
  public fullName: BehaviorSubject<string>;
  public lastName: BehaviorSubject<boolean>;
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loggedIn = new BehaviorSubject<boolean>(this.cookieService.check('auth'));
    this.fullName = new BehaviorSubject<string>(this.cookieService.get('name')+ ' ' +this.cookieService.get('family_name'));

  }

  /** signup */
  public signUp(signUpUser: UserModel): Observable<any> {
    return fromPromise(Auth.signUp(signUpUser));
  }

  public verifyCurrentUserAttribute(attr): Observable<any> {
    return fromPromise(Auth.verifyCurrentUserAttribute(attr));
  }

  public verifyCurrentUserAttributeSubmit(attr, code): Observable<any> {
    return fromPromise(Auth.verifyCurrentUserAttributeSubmit(attr, code));
  }
  /** confirm code */
  public confirmSignUp(email, code): Observable<any> {
    return fromPromise(Auth.confirmSignUp(email, code));
  }

  public resendCode(username): Observable<any> {
    return fromPromise(Auth.resendSignUp(username));
  }
  /** signin */
  public signIn(signInUser: SignModel): Observable<any> {
    return fromPromise(Auth.signIn(signInUser.username, signInUser.password))
      .pipe(
        tap(() => this.loggedIn.next(true))
      );
  }

  /** signout */
  public signOut() {
    fromPromise(Auth.signOut())
      .subscribe(
        result => {
          this.loggedIn.next(false);
          this.cookieService.delete('auth');
          this.cookieService.delete('idToken');
          this.cookieService.delete('username');
          this.cookieService.delete('name');
          this.cookieService.delete('userId');
          this.cookieService.delete('email');
          this.cookieService.delete('family_name');
          this.cookieService.delete('roleName');
          this.router.navigate(['/login']);
        },
        error => console.log(error)
      );
  }

  public forgotPassword(email) {
    return fromPromise(Auth.forgotPassword(email));
  }

  public forgotPasswordSubmit({email, code, password}) {
    return fromPromise(Auth.forgotPasswordSubmit(email, code, password));
  }

  public currentUserInfo() {
    return fromPromise(Auth.currentUserInfo());
  }
  public getUserAttributes() {
    return fromPromise(Auth.currentAuthenticatedUser()
      .then(user => {
        Auth.userAttributes(user)
          .then(result => {
            const attributes = [];
            result.map(attribute => {
              attributes[attribute.getName()] = attribute.getValue();
            });

          },
            error => console.log(error))

      }));
  }
  public isAuthenticated() {
    Auth.currentAuthenticatedUser().then(user => {
      this.cookieService.set('username', user.username);
      this.cookieService.set('name', user.attributes.name);
      this.cookieService.set('family_name', user.attributes.family_name);
      this.cookieService.set('userId', user.attributes['custom:userId']);
      this.cookieService.set('roleName', user.attributes['custom:roleName']);
      this.cookieService.set('email', user.attributes.email);
      this.loggedIn.next(true);
      this.fullName.next(this.cookieService.get('name')+ ' ' +this.cookieService.get('family_name'))
      this.router.navigate(['/home']);
    });

  }

  public currentCredentials() {
    return fromPromise(Auth.currentCredentials());
  }

  public currentSession() {
    return fromPromise(Auth.currentSession());
  }


  public changePassword({user, oldPassword, newPassword}) {
    return fromPromise(Auth.changePassword(user, oldPassword, newPassword));
  }
}
