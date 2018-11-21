import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminQuestionsComponent } from './admin/admin-questions/admin-questions.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'admin/questions',
    component: AdminQuestionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
