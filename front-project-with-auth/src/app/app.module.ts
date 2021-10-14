import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

import { EditorComponent } from './task/editor/editor.component';
import { TasksComponent } from './task/tasks/tasks.component';


import { AppRoutingModule } from './app-routing.module';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { TaskDetailComponent } from './task/task-detail/task-detail.component';
import {LoginComponent} from "./common/login/login.component";
import {AuthGuard} from "./common/auth/guard/auth.guard";
import {TokenInterceptor} from "./common/auth/token-interceptor/token-interceptor";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import { MainPageComponent } from './main-page/main-page.component';
import { TaskSearchComponent } from './task/task-search/task-search.component';
import { RegisterComponent } from './common/register/register.component';
//import { AgmCoreModule } from "@agm/core";



@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //??
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ButtonsModule,
    TypeaheadModule,
    BrowserAnimationsModule,
    //AgmCoreModule.forRoot({apiKey: 'AIzaSyBSzIc8SWZjRZQSA13GmXK-GVgKVGtcDEY'})

  ],
  declarations: [
    LoginComponent,
    AppComponent,
    TasksComponent,
    EditorComponent,
    AddTaskComponent,
    TaskDetailComponent,
    MainPageComponent,
    TaskSearchComponent,
    RegisterComponent,

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
