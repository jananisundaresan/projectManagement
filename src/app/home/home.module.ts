import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MenubarModule, TabViewModule} from 'primeng/primeng';
import { AdminComponent } from './admin/admin.component';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MenubarModule,
    TabViewModule,
    TableModule,
    ToastModule,
    ButtonModule
  ],
  declarations: [HomeComponent, AdminComponent]
})
export class HomeModule { }
