import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth/auth.service';
import Amplify, { Auth } from 'aws-amplify';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {UserModel,SignModel} from "../login/login.model";
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userform: FormGroup;
  verifyForm: FormGroup;
  error: string;
  userName: string;
  message: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private cookieService: CookieService) {
  }
  currentUserInfo: any;
  ngOnInit() {
    this.userform = this.fb.group({
      'name': new FormControl('', Validators.required),
      'family_name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
    });
    this.verifyForm = this.fb.group({
      code: ['', Validators.compose([Validators.required])],

    });



    this.authService.currentUserInfo().subscribe(data => {
      this.currentUserInfo = data.attributes;
      this.userName = data.username;
      this.userform.patchValue({
        name: this.currentUserInfo.name,
        family_name: this.currentUserInfo.family_name,
        email: this.currentUserInfo.email
      });

    });


  }
  onSubmit(value) {

    Auth.currentAuthenticatedUser().then(user => {
      Auth.updateUserAttributes(user, {name: value.name, family_name: value.family_name}).then(data => {
        this.message = 'User Profile Updated';
        this.cookieService.set('family_name', value.family_name);
        this.cookieService.set('name', value.name);
        this.authService.fullName.next(this.cookieService.get('name')+ ' ' +this.cookieService.get('family_name'))
      }, error => {
        this.message = error.message;
      });
    });
  }
}
