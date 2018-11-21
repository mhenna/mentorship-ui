import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminQuestionsComponent } from './admin/admin-questions/admin-questions.component';

import {SignupComponent} from './signup/signup.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'admin/questions',
    component: AdminQuestionsComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
