
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../auth/auth.service';

@Component({
    templateUrl: 'new-password-and-recovery-code-submission.component.html',
})
export class NewPasswordAndRecoveryCodeSubmissionComponent implements OnInit {

    form: FormGroup;
    error: string;
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService
    ) {  }


    ngOnInit() {
        this.buildForm();
    }

    private buildForm() {
        this.form = this.fb.group({
            email: [ '', Validators.compose([Validators.required, Validators.email])],
            code: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],

        });
    }

    changePassword(value) {
      const submit = {
        email: value.email,
        password: value.password,
        code: value.code
      }
        this.authService.forgotPasswordSubmit(submit).subscribe(
            data => {
                this.router.navigate(['/email_password_recovery/password_recovered_successfully']);
            },
            (err) => {
              this.error = err.message;
            }
        );
    }


}

