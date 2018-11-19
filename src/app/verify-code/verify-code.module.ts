import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyCodeRoutingModule } from './verify-code-routing.module';
import { VerifyCodeComponent } from './verify-code.component';
import {MessageModule} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    VerifyCodeRoutingModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [VerifyCodeComponent]
})
export class VerifyCodeModule { }
