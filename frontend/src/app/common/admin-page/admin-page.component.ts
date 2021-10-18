import { Component, OnInit } from '@angular/core';

import {User} from "../model/user/user";
import {TaskService} from "../model/task/service/task.service";
import {AdminService} from "./service/admin.service";
import {Task} from "../model/task/task";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  users: User[] = [];
  constructor(private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(): void {
    this.adminService.getUsers()
      .subscribe(users => this.users = users);
  }


}
