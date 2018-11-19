
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../auth/auth.service';

@Component({
    templateUrl: 'email-password-recovery.component.html',
    styleUrls: ['email-password-recovery.component.scss']
})
export class EmailPasswordRecoveryComponent implements OnInit {
    form: FormGroup;
    error: string;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.buildForm();
    }

    onSubmit(formValue) {
        this.authService.forgotPassword(formValue.email).subscribe(
            data => {
                this.router.navigate(['/email_password_recovery/submit_new_password']);
            },
            error => {
              this.error = error.message;
                console.log(error);
            },
        );
    }

    private buildForm() {
        this.form = this.fb.group({
            email: ['', Validators.compose([Validators.email, Validators.required])],
        });
    }
}
