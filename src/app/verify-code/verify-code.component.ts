import { Component, OnInit } from '@angular/core';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'username': new FormControl('', Validators.required),
      'code': new FormControl('', Validators.required),
    });
  }

  onSubmit(value) {
    this.authService.confirmSignUp(value.username, value.code ).subscribe((data) => {
      if (data === 'SUCCESS') {
        this.router.navigate(['/login']);
      }
      }, error => {
      console.log(error);
      this.error = error.message;
    });
  }

  resendCode(value) {
this.authService.resendCode(value.username).subscribe((data) => {
  // do nothing
  }, error => {
  console.log(error);
  this.error = error.message;
});
  }

}
