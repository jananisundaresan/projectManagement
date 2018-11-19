import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PanelModule, DropdownModule, InputTextModule, InputTextareaModule, MessageModule,
  ButtonModule, TabViewModule, MenubarModule, DialogModule, CalendarModule, RadioButtonModule,
  MultiSelectModule} from 'primeng/primeng';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {InterceptService} from './auth/intercept.service';
import { CookieService } from 'ngx-cookie-service';
import {UserService} from './services/user.service';
import {AmplifyService} from "aws-amplify-angular";
import {CoreModule} from "./core/core.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TabViewModule,
    MessageModule,
    HttpClientModule,
    MenubarModule,
    CoreModule,
    NgbModule,
    DialogModule,
    CalendarModule,
    MultiSelectModule,
    TableModule,
    RadioButtonModule,
    ToastModule
  ],
  providers: [ AuthService, UserService, AmplifyService,
    AuthGuard, InterceptService, CookieService, DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
