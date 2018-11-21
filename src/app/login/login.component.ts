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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  async submitForm() {
    try {
      const response = await this.loginService.login(this.validateForm.get('userName').value,this.validateForm.get('password').value);
      this.localStorageService.add('token', response.token);
      this.router.navigate(['./admin/questions']);
    } catch (error) {
      this.message.error('invalid credentials', { nzDuration: 5000 });
    }
  }

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder,private loginService:LoginService, private message: NzMessageService, private localStorageService: LocalStorageService, public router: Router,public auth: AuthService) {
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()){
      this.router.navigate(['./signup']);
    }
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }

}
