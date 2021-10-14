// страница add, создание задачи
import { Component, OnInit } from '@angular/core';
import {Task} from "../../common/model/task/task";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../common/model/task/service/task.service";
import {Location} from "@angular/common";
import jwt_decode from "jwt-decode";
import {AuthService} from "../../common/auth/auth.service/auth.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location,
    private router: Router,
    private authService: AuthService

  ) {
  }

  task: Task;
  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }

  ngOnInit(): void {
    //console.log(this.getDecodedAccessToken(this.authService.getToken()).user);
    this.task={
      id:0,
      user:{
        id:this.getDecodedAccessToken(this.authService.getToken()).user,
        name:""
      },
      taskName:"",
      taskCondition:"",
      taskTopic:"",
      tags:"",
      answerOptions:"",
      rating:0,
      rightSolution:""
    }
  }

  goBack(): void {
    this.location.back();
  }

  add(): void {
    this.taskService.addTask( this.task )
      .subscribe(task => {
        this.router.navigate(['/personalPage']);  //
      });
  }

}
