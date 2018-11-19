import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth/auth.service';
import Amplify, { Auth } from 'aws-amplify';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {projectModel} from "./project-management.model";
import {UserService} from "../services/user.service";
import {SelectItem} from "primeng/api";
import {GetUserModel} from "../login/login.model";
import {v4 as uuid} from 'uuid';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {
  title: string;
  type: string;
  users: any[];
  display: boolean = false;
  project: any;
  projectManager: string;
  userform: FormGroup;
  projects: projectModel[];
  cols: any[];
  role:string;
  disableInput: boolean;
  projectDevelopers: SelectItem[];
  projectStatusDropdown: SelectItem[];
  showDialog(type) {
    this.type = type;
    if(this.type === 'create') {
      this.title = 'Create Project';
      this.projectManager = this.authService.fullName.value;
      this.userform = this.fb.group({
        'projectName': new FormControl('', Validators.required),
        'projectStatus': new FormControl('', Validators.required),
        'projectDescription': new FormControl('', Validators.required),
        'projectStartDate': new FormControl('', Validators.required),
        'projectEndDate': new FormControl('', Validators.required),
        'projectDevelopers': new FormControl('', Validators.required)
      });
    } else {
      this.title = 'Edit Project';
      this.projectManager = this.project.projectManager;
      this.userform = this.fb.group({
        'projectName': new FormControl({value: this.project.projectName, disabled: this.disableInput}, Validators.required),
        'projectStatus': new FormControl({value: this.project.projectStatus, disabled: this.disableInput}, Validators.required),
        'projectDescription': new FormControl(this.project.projectDescription, Validators.required),
        'projectStartDate': new FormControl({value: new Date(this.project.projectStartDate),  disabled: this.disableInput}, Validators.required),
        'projectEndDate': new FormControl({value: new Date(this.project.projectEndDate),  disabled: this.disableInput}, Validators.required),
        'projectDevelopers': new FormControl({value: this.project.projectDevelopers, disabled: this.disableInput}, Validators.required)
      });

    }
    this.display = true;
  }

  constructor(private fb: FormBuilder, private userService: UserService, private datePipe: DatePipe,
              private authService: AuthService, private router: Router, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.projectDevelopers = [];
    this.userService.getRole().subscribe(data => {
      if(data && data[0]&& data[0].roleName) {
        this.role = data[0].roleName;
        this.disableInput = data[0].roleName === 'Developer';
      } else {
        this.role = 'Developer';
        this.disableInput = true;
      }



    }, error => {
      console.log(error.message);
    });
    this.cols = [
      { field: 'projectName', header: 'Name' },
      { field: 'projectStatus', header: 'Status' },
      { field: 'projectManager', header: 'Manager' },
      { field: 'projectDescription', header: 'Description' },
      { field: 'projectStartDate', header: 'Start Date' },
      { field: 'projectEndDate', header: 'End Date' },
      { field: 'developers', header: 'Developers' }
    ];
this.projectStatusDropdown = [ {label:'Select a value', value: null},
  {label:'Active', value: 'Active'},
  {label:'In Progress', value: 'In Progress'},
  {label:'Completed', value: 'Completed'},]


    this.userService.getUsers().subscribe((data: GetUserModel) => {
      this.users = data.users;
      for(let value in  this.users) {
        this.projectDevelopers.push({label: this.users[value].name + ' ' +  this.users[value].family_name, value: this.users[value]['custom:userId']});
      }
      this.updateProject();


    });
  }
  onSubmit(value) {
    let project = {};
    console.log(value);
    if(this.type === 'create') {
      project = {
        "userId": this.cookieService.get('userId'),
        "projectName": value.projectName,
        "projectId": uuid(),
        "projectStatus": value.projectStatus,
        "projectDescription": value.projectDescription,
        "projectManager": this.projectManager,
        "projectStartDate": value.projectStartDate,
        "projectEndDate": value.projectEndDate,
        "projectDevelopers": value.projectDevelopers,
      };
    }
    else {
       project = {
        "userId": this.project.userId,
        "projectName": value.projectName || this.project.projectName,
        "projectId": this.project.projectId ,
        "projectStatus": value.projectStatus || this.project.projectStatus,
        "projectDescription": value.projectDescription || this.project.projectDescription,
        "projectManager": this.project.projectManager || this.project.projectManager,
        "projectStartDate": value.projectStartDate || this.project.projectStartDate,
        "projectEndDate": value.projectStartDate || this.project.projectStartDate,
        "projectDevelopers": value.projectDevelopers || this.project.projectDevelopers,
      };
    }

    this.userService.createProject(project).subscribe(data => {
      this.updateProject();
      this.display = false;
    }, error => {
      console.log(error.message);
    });

  }

  checkUser(project) {
    const developers = [];
    project.projectDevelopers.forEach(developer => {
      this.users.filter(
        user => {
          if(user['custom:userId'] === developer) {
          developers.push(user.name + ' ' + user.family_name);
      }});
      project.developers = developers;
    })

  }
  checkDropdown(project) {
    const developers = [];
    project.projectDevelopers.forEach(developer => {
      this.users.filter(
        user => {
          if(user.name + ' ' + user.family_name === developer) {
            developers.push( user.name + ' ' +  user.family_name);
          }});

    })
    return developers;
  }

  updateProject() {
    this.userService.getProjects().subscribe((response) => {
      this.projects = response;

      this.projects.forEach(project => {
        this.checkUser(project);
      });

    });
  }
}
