import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../model/task/service/task.service";
import {Location} from "@angular/common";
import {AuthService} from "../auth/auth.service/auth.service";
import {Task} from "../model/task/task";


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location,
    private router: Router,
    private authService: AuthService

  ) {
  }

  task: Task;


  ngOnInit(): void {
    this.task={
      id:0,
      user:{
        id:Number(this.route.snapshot.paramMap.get('id')),
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
      });
  }

}
