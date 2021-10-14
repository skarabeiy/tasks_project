import { Component, OnInit } from '@angular/core';
import {Task} from "../common/model/task/task";
import {TaskService} from "../common/model/task/service/task.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  tasks1: Task[] = [];
  tasks2: Task[] = [];
  constructor( private taskService: TaskService

  ) { }

  ngOnInit(): void {
    this.getLastCreatedTasks();
    this.getBestRatingTasks()
  }

  getLastCreatedTasks(): void {
    this.taskService.getLastCreatedTasks()
      .subscribe(tasks => this.tasks1 = tasks);
  }

  getBestRatingTasks(): void {
    this.taskService.getBestRatingTasks()
      .subscribe(tasks => this.tasks2 = tasks);
  }

}
