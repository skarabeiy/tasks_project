import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

import { EditorComponent } from './task/editor/editor.component';
import { TasksComponent } from './task/tasks/tasks.component';


import { AppRoutingModule } from './app-routing.module';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
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
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {RatingModule} from "ng-starrating";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './common/admin/admin.component';
import { AdminPageComponent } from './common/admin-page/admin-page.component';
import { PageComponent } from './common/page/page.component';
import { AddPageComponent } from './common/add-page/add-page.component';
import { PageViewComponent } from './common/page-view/page-view.component';




export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ButtonsModule,
    TypeaheadModule,
    RatingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage:'en'
    }),
    NgbModule


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
    AdminComponent,
    AdminPageComponent,
    PageComponent,
    AddPageComponent,
    PageViewComponent,


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
export class AppModule {

}

