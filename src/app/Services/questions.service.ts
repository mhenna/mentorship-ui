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
      this.http.get(environment.apiUrl + `/questions/get`, { headers: reqHeaders })
        .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  getSpecQuestions(type): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*')
      this.http.get(environment.apiUrl + `/questions/${type}`, { headers: reqHeaders })
        .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  submitQuestion(text, matching, mentor, userInfo, type, answers): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      console.log(answers)
      data.append('question_text', text);
      data.append('is_matching', matching);
      data.append('is_mentor', mentor)
      data.append('user_info', userInfo)
      data.append('question_type', type)
      data.append('text', answers)
      console.log("TEXTTTTTTTTTTTTTTTT", answers)
      const http = new XMLHttpRequest();
      http.open('POST', this.domain + '/questions/');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      console.log("DATAAAAAAAAAAAAAAAAAA", data)
      http.send(data);
      http.onload = () => {
        observer.next(http.response)
        observer.complete();
      };

    })
  }
  submitPossibleAnswersToQuestion(id, original, text) {
    const reqHeaders: HttpHeaders = new HttpHeaders();
    reqHeaders.append('Content-Type', 'application/json');
    console.log('THIS IS TEXTTTTT', text)    
    reqHeaders.append('Authorization',  this.localStorage.get('token'));
    return this.http.post(this.domain + "/answers/" ,{"answer_to_question":id, "original": original, "text": text}, { headers: reqHeaders })
    .subscribe(res => {console.log(res, "SUBMITING")});
  }
  editQuestion(question): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('id', question.id);
      if(question.is_mentor)
        data.append('is_mentor', 'True');
      else
        data.append('is_mentor', 'False')
      if(question.is_matching)
        data.append('is_matching', 'True');
      else
        data.append('is_matching', 'False');
      data.append('question_text', question.question_text);
      data.append('question_type', question.question_type);
      const http = new XMLHttpRequest();
      http.open('PUT', this.domain + '/questions/edit');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };

    })
  }
  editAnswersToQuestion(id, text) {
    const reqHeaders: HttpHeaders = new HttpHeaders();
    reqHeaders.append('Content-Type', 'application/json');
    console.log('THIS IS TEXTTTTT', text)
    reqHeaders.append('Authorization',  this.localStorage.get('token'));
    return this.http.put(this.domain + "/answers/edit" ,{"id":id, "text": text}, { headers: reqHeaders })
    .subscribe(res => {console.log(res, "SUBMITING")});
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

  getMembersAnswers(): Promise<any>{
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*');
      this.http.get(environment.apiUrl + `/answers/getAnswers`, {headers: reqHeaders})
      .subscribe((data) => resolve(data), err => reject(err));
    });

  }


  submit(user, id, answer) {
    const reqHeaders: HttpHeaders = new HttpHeaders();
    reqHeaders.append('Content-Type', 'application/json');
    
    reqHeaders.append('Authorization',  this.localStorage.get('token'));
    return this.http.post(environment.apiUrl + "/answers/" ,{"answer_from_user":user, "answer_to_question":id, "text": answer}, { headers: reqHeaders })
    .subscribe(res => {console.log(res, "SUBMITING")});
  }
}