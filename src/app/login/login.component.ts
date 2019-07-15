import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginService } from '../Services/login.service';
import { NzMessageService } from 'ng-zorro-antd';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import {HeaderButtonsService } from '../Services/header-buttons.service'
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  async submitForm() {
    try {
      const response = await this.loginService.login(this.validateForm.get('userName').value,this.validateForm.get('password').value);
      this.localStorageService.set('token', response.token);
      this.headerButtonsService.setIsSignedIn();
      this.router.navigate(['./admin/dashboard']);
      
    } catch (error) {
      this.message.error('invalid credentials', { nzDuration: 5000 });
    }
  }

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder,
    private loginService:LoginService, 
    private headerButtonsService : HeaderButtonsService, 
    private message: NzMessageService, 
    private localStorageService: LocalStorageService, 
    public router: Router,
    public auth: AuthService,
) {
  }

  ngOnInit(): void {
   this.localStorageService.remove('token');
    // if (!this.auth.isAuthenticated()){
    //   this.router.navigate(['./signup']);
    // }
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }

}
