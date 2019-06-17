import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import "rxjs";

import { environment } from '../../environments/environment';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class QuestionsService {


  public domain = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
  }

  getQuestions(type): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*')
      this.http.get(environment.apiUrl + `/questions/`, { headers: reqHeaders })
        .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  submitQuestion(text, matching, mentor, userInfo, type): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('question_text', text);
      data.append('is_matching', matching);
      data.append('is_mentor', mentor)
      data.append('user_info', userInfo)
      data.append('question_type', type)
      const http = new XMLHttpRequest();
      http.open('POST', this.domain + '/questions/');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };

    })
  }
  submitAnswer(text, matching, mentor, userInfo, type): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('question_text', text);
      data.append('is_matching', matching);
      data.append('is_mentor', mentor)
      data.append('user_info', userInfo)
      data.append('question_type', type)
      const http = new XMLHttpRequest();
      http.open('POST', this.domain + '/questions/');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };

    })
  }


  submit(user, id, answer) {
    const reqHeaders: HttpHeaders = new HttpHeaders();
    reqHeaders.append('Content-Type', 'application/json');
    
    reqHeaders.append('Authorization',  this.localStorage.get('token'));
    return this.http.post(environment.apiUrl + "/answers/" ,{"answer_from_user":user, "answer_to_question":id, "text": answer}, { headers: reqHeaders })
    .subscribe(res => {console.log(res, "SUBMITING")});
  }
}