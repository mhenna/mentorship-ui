import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import "rxjs";

import { environment } from '../../environments/environment';

@Injectable()
export class QuestionsService {
  constructor(
    private http: HttpClient,
    ) {
  }

  getQuestions(type): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*')
      this.http.get(environment.apiUrl + `/questions/get-questions/${type}`, {headers: reqHeaders})
      .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  submit(body): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*')
      this.http.post(environment.apiUrl + `/users/signup`,body ,{headers: reqHeaders})
      .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  
}