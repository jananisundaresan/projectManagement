import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {MenubarModule, TabViewModule, ButtonModule} from 'primeng/primeng';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    MenubarModule,
    TabViewModule,
    ButtonModule,
    NgbModule
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class CoreModule { }
