import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewPasswordAndRecoveryCodeSubmissionComponent} from './new-password-and-recovery-code-submission/new-password-and-recovery-code-submission.component';
import {PasswordRecoveredSuccessfullyComponent} from './password-recovered-successfully/password-recovered-successfully.component';
import {EmailPasswordRecoveryComponent} from './email-password-recovery.component';

const routes: Routes = [
    { path: '', component: EmailPasswordRecoveryComponent },
    { path: 'submit_new_password', component: NewPasswordAndRecoveryCodeSubmissionComponent },
    { path: 'password_recovered_successfully', component: PasswordRecoveredSuccessfullyComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmailPasswordRecoveryRoutingModule { }
