// страница view, просмотр задачи

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../common/model/task/service/task.service";
import {Location} from "@angular/common";
import {Task} from "../../common/model/task/task";
import {Rating} from "../../common/model/rating/rating";
import {User} from "../../common/model/user/user";
import {TaskWithName} from "../../common/model/task/taskWithName";

import {RatingService} from "../../common/model/rating/service/rating.service";
import {AnswerService} from "../../common/model/answer/service/answer.service";
import {Answer} from "../../common/model/answer/answer";
import {AuthService} from "../../common/auth/auth.service/auth.service";
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {constructor(
  private route: ActivatedRoute,
  private taskService: TaskService,
  private location: Location,
  private router: Router,
  private ratingService: RatingService,
  private answerService: AnswerService,
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
  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);

  }

  setRating(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    let userId = this.getDecodedAccessToken(this.authService.getToken()).user;
    let task: TaskWithName = {
      id:0,
      taskName:""
    };
    let user: User={
      id:0,
      name:""
    };
    task.id = id;
    user.id = userId;
    this.rating.task = task;
    this.rating.user = user;
    //console.log(this.rating);
    this.ratingService.setRating(this.rating)  //Отправляем на бекенд
      .subscribe(()=>this.ngOnInit());
  }

  setAnswer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    let userId = this.getDecodedAccessToken(this.authService.getToken()).user;
    let task: TaskWithName = {
      id:0,
      taskName:""
    };
    let user: User={
      id:0,
      name:""
    };
    task.id = id;
    user.id = userId;

    this.answer.task = task;
    this.answer.user = user;

    this.answerService.setAnswer(this.answer)
      .subscribe(answer=>{
        if(answer.answer){
          alert("right");
        } else{
          alert("wrong");
        }
      })

  }

}
