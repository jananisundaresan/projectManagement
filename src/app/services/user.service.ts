import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  result: any;

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  getUsers() {
    const uri = 'https://1ndav6mxce.execute-api.eu-west-2.amazonaws.com/prod/users';

    return this.http.get(uri)
      .pipe(
        map(res => {
          return res;
        }));
  }

  getProjects() {
    const uri = ' https://1ndav6mxce.execute-api.eu-west-2.amazonaws.com/prod/project/' + this.cookieService.get('userId');

    return this.http.get(uri)
      .pipe(
        map(res => {
          return res['body'];
        }));
  }

  createProject(project) {
    const uri = 'https://1ndav6mxce.execute-api.eu-west-2.amazonaws.com/prod/project';

    return this.http.post(uri, project)
      .pipe(
        map(res => {
          return res;
        }));
  }

  getRole() {
    const uri = ' https://1ndav6mxce.execute-api.eu-west-2.amazonaws.com/prod/roles/' + this.cookieService.get('userId');

    return this.http.get(uri)
      .pipe(
        map(res => {
          return res['body'];
        }));
  }

  postRole(body) {
    const uri = 'https://1ndav6mxce.execute-api.eu-west-2.amazonaws.com/prod/roles';
    return this.http.post(uri, body)
      .pipe(
        map(res => {
          return res['body'];
        }));
  }




}
