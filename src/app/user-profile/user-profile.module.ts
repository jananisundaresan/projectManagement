import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import {MessageModule, MenubarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    MenubarModule
  ],
  declarations: [UserProfileComponent]
})
export class UserProfileModule {

}
