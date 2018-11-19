import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard] },
  { path: 'email_password_recovery', loadChildren: './email-password-recovery/email-password-recovery.module#EmailPasswordRecoveryModule'},
  { path: 'verifyCode', loadChildren: './verify-code/verify-code.module#VerifyCodeModule' },
  { path: 'userProfile', loadChildren: './user-profile/user-profile.module#UserProfileModule', canActivate: [AuthGuard] },
  { path: 'projects', loadChildren: './project-management/project-management.module#ProjectManagementModule', canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
