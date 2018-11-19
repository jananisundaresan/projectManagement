import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'admin', component: AdminComponent}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
