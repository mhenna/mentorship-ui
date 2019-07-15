import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AdminService {
  public headers: Headers = new Headers();
  public domain = environment.apiUrl;

  constructor(private http: Http,
    private localStorage: LocalStorageService) { }

  iniviteMentor(email): Observable<any> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('email', email);
      const http = new XMLHttpRequest();
      http.open('POST', this.domain + '/admin/invite');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };
    })
  }

  getCycles(): Observable<any> {
    this.headers.set('Authorization', this.localStorage.get('token'));
    return this.http.get(this.domain + '/cycles/', { headers: this.headers }).pipe(
      map((res) => res.json()));
    ;
  }

  getSkills(): Observable<any> {
    this.headers.set('Authorization', this.localStorage.get('token'));
    return this.http.get(this.domain + '/cycles/skills', { headers: this.headers }).pipe(
      map((res) => res.json()));
    ;
  }
  getDeadlines(): Observable<any> {
    this.headers.set('Authorization', this.localStorage.get('token'));
    return this.http.get(this.domain + '/cycles/deadline', { headers: this.headers }).pipe(
      map((res) => res.json()));
    ;
  }
  editDeadlines(mentor, mentee, cycle): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('mentor', mentor);
      data.append('mentee', mentee);
      data.append('cycle', cycle.id)
      const http = new XMLHttpRequest();
      http.open('PUT', this.domain + '/cycles/edit/deadline');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        if (http.status < 300)
          observer.next(http.status);
        else
          observer.error(JSON.parse(http.response).message);
        observer.complete();
      };

    })
  }

  editStartDate(mentor, mentee, cycle): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('mentor', mentor);
      data.append('mentee', mentee);
      data.append('cycle', cycle.id)
      const http = new XMLHttpRequest();
      http.open('PUT', this.domain + '/cycles/edit/startdate');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        if (http.status < 300)
          observer.next(http.status);
        else
          observer.error(JSON.parse(http.response).message);
        observer.complete();
      };

    })
  }

  addSkill(name, type): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('type', type);
      data.append('name', name);
      const http = new XMLHttpRequest();
      http.open('POST', this.domain + '/cycles/skills');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };

    })
  }
  deleteUser(id): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('id', id);
      const http = new XMLHttpRequest();
      http.open('DELETE', this.domain + '/admin/delete');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };
    })
  }

  addCycle(startDate, endDate, name): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('start_date', startDate);
      data.append('end_date', endDate);
      data.append('name', name);
      const http = new XMLHttpRequest();
      http.open('POST', this.domain + '/cycles/');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };

    })
  }
  addSkilltoCycle(skill, id): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('skill', skill);
      data.append('id', id);
      const http = new XMLHttpRequest();
      http.open('PUT', this.domain + '/cycles/add/skills');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        if (http.status < 300)
          observer.next(http.status);
        else
          observer.error(JSON.parse(http.response).message);
        observer.complete();
      };

    })
  }
  editCycle(id, startDate, endDate, name): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('id', id);
      data.append('start_date', startDate);
      data.append('end_date', endDate);
      data.append('name', name);
      const http = new XMLHttpRequest();
      http.open('PUT', this.domain + '/cycles/edit');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        if (http.status < 300)
          observer.next(http.status);
        else
          observer.error(JSON.parse(http.response).message);
        observer.complete();
      };

    })
  }
  deleteCycle(id): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('id', id);
      const http = new XMLHttpRequest();
      http.open('DELETE', this.domain + '/cycles/delete');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        if (http.status < 300)
          observer.next(http.status);
        else
          observer.error(JSON.parse(http.response).message);
        observer.complete();
      };

    })
  }



  sendEmail(type, email, body): Observable<string> {
    return Observable.create(observer => {
      var t = [];
      t = email
      const data = new FormData();
      data.append('type', type);
      data.append('email', email);
      data.append('emailBody', body);
      const http = new XMLHttpRequest();
      http.open('POST', this.domain + '/admin/email');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };

    })
  }
}