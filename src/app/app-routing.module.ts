import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminQuestionsComponent } from './admin/admin-questions/admin-questions.component';
import { SignupComponent } from './signup/signup.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuardService } from './Services/auth-guard.service';
import{InviteMentorComponent} from './admin/invite-mentor/invite-mentor.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import { AllUsersComponent } from './all-users/all-users.component';
import {CycleComponent} from './admin/cycle/cycle.component';
import { MatchUsersComponent } from './match-users/match-users.component';
import { EmailComponent } from './admin/email/email.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CycleMembersComponent } from './cycle-members/cycle-members.component';

const routes: Routes = [
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/cycle',
    component: CycleComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/email',
    component: EmailComponent
  },
  {
    path: 'admin/questions',
    component: AdminQuestionsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/match',
    component: MatchUsersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin/cycle/members/:cycleId',
    component: CycleMembersComponent,
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'user',
    component: UserProfileComponent
  },
  {
    path: 'admin/users',
    component: AllUsersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/invite',
    component: InviteMentorComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
