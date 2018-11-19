import {Component, OnInit} from '@angular/core';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {UserModel, SignModel} from './login.model';
import {v4 as uuid} from 'uuid';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
  userform: FormGroup;
  loginForm: FormGroup;
  signUpUser: UserModel;
  error: string;
  loginError: string;
  signInUser: SignModel;
  verifiedUser: boolean;

  constructor(private fb: FormBuilder,private userService: UserService, private authService: AuthService, private router: Router, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.userform = this.fb.group({
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([ Validators.required, Validators.minLength(8) ]))
    });
    this.loginForm = this.fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([ Validators.required, Validators.minLength(8) ]))
    });
  }

  onSubmit(value) {
    this.signUpUser = {
      'username': value.username,
      'password': value.password,
      'attributes': {
        'email': value.email,
        'name': value.firstname,
        'family_name': value.lastname,
        'custom:userId': uuid(),
        'custom:roleName': 'Developer'
      }
    };
    this.authService.signUp(this.signUpUser).subscribe((data) => {
      this.router.navigate([ 'verifyCode' ]);
    }, error => {
      this.error = error.message;
    });
  }

  login(value) {
    this.signInUser = {
      'username': value.username,
      'password': value.password
    };
    this.authService.signIn(this.signInUser).subscribe((data) => {
      this.cookieService.set('username', data[ 'username' ]);
      this.cookieService.set(
        'auth',
        data[ 'signInUserSession' ][ 'accessToken' ][ 'jwtToken' ]
      );
      this.cookieService.set(
        'idToken',
        data[ 'signInUserSession' ][ 'idToken' ][ 'jwtToken' ]
      );
      this.authService.isAuthenticated();
    }, error => {
      if (error.code === 'UserNotConfirmedException') {
        this.verifiedUser = true;
      } else {
        this.loginError = error.message;
      }
    });
  }

  verifyCode(value) {
    this.authService.resendCode(value.username).subscribe((data) => {
      this.router.navigate([ 'verifyCode' ]);
    }, error => {
      console.log(error);
    });
  }

}
