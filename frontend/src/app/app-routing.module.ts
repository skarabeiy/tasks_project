import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TasksComponent } from './task/tasks/tasks.component';
import { EditorComponent } from './task/editor/editor.component';
import {AddTaskComponent} from "./task/add-task/add-task.component";
import {TaskDetailComponent} from "./task/task-detail/task-detail.component";
import {AuthGuard} from "./common/auth/guard/auth.guard";
import {LoginComponent} from "./common/login/login.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {RegisterComponent} from "./common/register/register.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  // { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'detail/:id', component: EditorComponent },
  { path: 'personalPage', component: TasksComponent },   //
  { path: 'personalPage/add', component: AddTaskComponent},  //
  { path: 'view/:id', component: TaskDetailComponent },
  { path: 'mainPage', component: MainPageComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
