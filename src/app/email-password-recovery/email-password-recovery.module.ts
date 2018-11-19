import { NgModule } from '@angular/core';
import { PasswordRecoveredSuccessfullyComponent } from './password-recovered-successfully/password-recovered-successfully.component';
import { NewPasswordAndRecoveryCodeSubmissionComponent } from './new-password-and-recovery-code-submission/new-password-and-recovery-code-submission.component';
import { EmailPasswordRecoveryComponent } from './email-password-recovery.component';
import { EmailPasswordRecoveryRoutingModule} from './email-password-recovery-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessageModule} from 'primeng/primeng';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
      EmailPasswordRecoveryRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MessageModule,
      CommonModule
    ],
    declarations: [
        EmailPasswordRecoveryComponent,
        PasswordRecoveredSuccessfullyComponent,
        NewPasswordAndRecoveryCodeSubmissionComponent
    ],
})
export class EmailPasswordRecoveryModule {

}

