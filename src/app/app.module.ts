import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule,   } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AdminQuestionsComponent } from './admin/admin-questions/admin-questions.component';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { SignupComponent } from './signup/signup.component';
import { McquestionComponent } from './mcquestion/mcquestion.component';
import { SelectManyQuestionComponent } from './select-many-question/select-many-question.component';
import { TextQuestionComponent } from './text-question/text-question.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LocalStorageModule } from 'angular-2-local-storage';
import {AuthGuardService} from './Services/auth-guard.service';
import { AuthService } from './Services/auth.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import {QuestionsService} from '../app/Services/questions.service'
import {LoginService} from './Services/login.service';
import {UserService} from './Services/user.service';
import { HttpModule } from '@angular/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { MatchUsersComponent } from './match-users/match-users.component'
import { InviteMentorComponent } from './admin/invite-mentor/invite-mentor.component'
import { AdminService } from './Services/admin.service';
import { CycleComponent } from './admin/cycle/cycle.component';
import { EmailComponent } from './admin/email/email.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AdminQuestionsComponent,
    SignupComponent,
    McquestionComponent,
    SelectManyQuestionComponent,
    TextQuestionComponent,
    UnauthorizedComponent,
    UserProfileComponent,
    AllUsersComponent,
    CycleComponent,
    MatchUsersComponent,
    InviteMentorComponent,
    EmailComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    ClarityModule,
    CommonModule,
    HttpModule,
   
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
  }),
  LocalStorageModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, UserService, QuestionsService, LoginService, AuthGuardService, AuthService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
