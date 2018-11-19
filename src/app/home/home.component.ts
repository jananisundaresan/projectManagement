import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../auth/auth.service';
import {UserService} from '../services/user.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUserInfo;
  currentAuthenticatedUser;
  currentSession;
  currentCredentials;

  constructor(
    private router: Router, private userService: UserService,
    public authService: AuthService, private route: Router
  ) {
  }

  ngOnInit() {

    this.authService.currentUserInfo().subscribe(data => {
      this.currentUserInfo = data;
      if(!data) {
        this.authService.signOut();
      }
      else if(data.attributes['custom:roleName']=== 'Admin') {
this.router.navigate(['home/admin']);
      } else {
        this.router.navigate(['projects'])
      }

    });



    this.authService.currentSession().subscribe(data => {
      this.currentSession = data;
    });


    this.authService.currentCredentials().subscribe(data => {
      this.currentCredentials = data;
    });

  }
    logout() {
    this.authService.signOut();
  }

}
