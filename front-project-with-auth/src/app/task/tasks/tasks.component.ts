// страница tasks, главная страница задач
import { Component, OnInit } from '@angular/core';

import { Task } from '../../common/model/task/task';
import { TaskService } from '../../common/model/task/service/task.service';
import jwt_decode from "jwt-decode";
import {AuthService} from "../../common/auth/auth.service/auth.service";
import {Achievements} from "../../common/model/achievements/achievements";
import {AchievementsService} from "../../common/model/achievements/service/achievements.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  achievements: Achievements;
  constructor(private taskService: TaskService,
              private authService: AuthService,
              private achievementsService: AchievementsService
  ) { }

  ngOnInit() {
    let id = this.getDecodedAccessToken(this.authService.getToken()).user;
    this.getTasksByUser(id);
    this.getAchievements(id);
  }

  // getTasks(): void {
  //   this.taskService.getTasks()
  //     .subscribe(tasks => this.tasks = tasks);
  // }

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }
  getAchievements(id: number):void{
    this.achievementsService.getAchievements(id)
      .subscribe( achievements=> this.achievements = achievements);
  }
  getTasksByUser(id: number): void {
        this.taskService.getTasksByUser(id)
          .subscribe(tasks => this.tasks = tasks);
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }


}
