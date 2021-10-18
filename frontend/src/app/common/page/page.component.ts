import { Component, OnInit } from '@angular/core';
import {Task} from "../model/task/task";
import {Achievements} from "../model/achievements/achievements";
import {TaskService} from "../model/task/service/task.service";
import {AuthService} from "../auth/auth.service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AchievementsService} from "../model/achievements/service/achievements.service";
import jwt_decode from "jwt-decode";
import {Location} from "@angular/common";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  tasks: Task[] = [];
  achievements: Achievements;

  constructor(private taskService: TaskService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private achievementsService: AchievementsService
  ) {

  }


  ngOnInit() {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTasksByUser(id);
    this.getAchievements(id);
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
  goBack(): void {
    this.location.back();
  }

}
