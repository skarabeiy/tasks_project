import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../model/task/service/task.service";
import {Location} from "@angular/common";

import {AuthService} from "../auth/auth.service/auth.service";
import {Answer} from "../model/answer/answer";
import {Rating} from "../model/rating/rating";
import {Task} from "../model/task/task";


@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css']
})
export class PageViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) {
  }
  answer: Answer;
  rating: Rating;
  task: Task;


  ngOnInit(): void {
    this.getTask();
    this.rating = {
      id: 0,
      user: {
        id: 0,
        name: ""
      },
      task: {
        id: 0,
        taskName: ""
      },
      rating: 0
    };
    this.answer = {
      id: 0,
      user: {
        id: 0,
        name: ""
      },
      task: {
        id: 0,
        taskName: ""
      },
      answer: ""
    };
  }

  goBack(): void {
    this.location.back();
  }


  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);

  }

}
