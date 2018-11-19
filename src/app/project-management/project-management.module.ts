import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogModule, ButtonModule} from "primeng/primeng";
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectManagementComponent } from './project-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessageModule, MenubarModule,CalendarModule, MultiSelectModule, RadioButtonModule, DropdownModule } from 'primeng/primeng';
import {TableModule} from 'primeng/table';
@NgModule({
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    MenubarModule,
    CalendarModule,
    MultiSelectModule,
    TableModule,
    DropdownModule,
    RadioButtonModule
  ],
  declarations: [ProjectManagementComponent]
})
export class ProjectManagementModule { }
