import { Injectable, OnDestroy } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import "rxjs";

import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    ) {
  }

  login(email,password): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*')
      this.http.post(environment.apiUrl + `/admin/login`,{email,password}, {headers: reqHeaders})
      .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  
  
}