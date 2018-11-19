import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import { MenubarModule, MenuItem} from 'primeng/primeng';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  public items: MenuItem[];
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) { }
  fullName: string;
  ngOnInit() {

    this.items = [
      {
        label: 'Project Management',
        routerLink: '/home'
      }
    ];
    this.authService.loggedIn.subscribe((data) => {
      this.loggedIn = data;
    })
    this.authService.fullName.subscribe((data) => {
      this.fullName = data;
    })
  }
  logout() {
    this.authService.signOut();
  }
}
