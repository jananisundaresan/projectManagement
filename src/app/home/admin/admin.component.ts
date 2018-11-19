import { Component, OnInit } from '@angular/core';
import {GetUserModel, UserDataModel} from "../../login/login.model";
import {UserService} from "../../services/user.service";
import {MessageService} from "primeng/api";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [MessageService]
})
export class AdminComponent implements OnInit {
  users: UserDataModel[];
  user: UserDataModel;
  cols: any[];
  enablePermissions: boolean;

  constructor(private userService: UserService, private messageService: MessageService, private cookieService: CookieService) {
    this.enablePermissions = this.cookieService.check('roleName');
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((data: GetUserModel) => {
      this.users = data.users;
    });
    this.cols = [
      { field: 'name', header: 'First Name' },
      { field: 'family_name', header: 'Last Name' },
      { field: 'username', header: 'UserName' },
      { field: 'email', header: 'Email' }

    ];
  }

  setRole(role) {
    if(this.user['custom:roleName'] === 'Admin') {
      this.messageService.add({severity:'error', summary: ' Cannot assigned', detail: 'Admin role cannot be set'});
    } else {
      const body = {
        userId: this.user['custom:userId'],
        roleName: role
      }

      this.userService.postRole(body).subscribe((data) => {
        this.messageService.add({severity:'success', summary: ' Role assigned', detail: role});
      });
    }

  }

}
