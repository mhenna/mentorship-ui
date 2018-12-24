import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminService {
  public headers: Headers = new Headers();
  public domain = environment.apiUrl;

  constructor(private http: Http) { }

  iniviteMentor(email): Observable<any> {
    this.headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
    return this.http.post(this.domain + '/admin/invite',{email}, {headers: this.headers});
  }
  getCycles(): Observable<any> {
    this.headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
    return this.http.get(this.domain + '/cycles/skills', {headers: this.headers}).pipe(
      map((res) => res.json()));
;
  }
  deleteUser(id): Observable<string> {
    return Observable.create(observer =>{
      const data = new FormData();
      data.append('user_id', id);
      const http = new XMLHttpRequest();
      http.open('DELETE',this.domain + '/admin/delete');
      http.setRequestHeader('Authorization', localStorage.getItem('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };   
    })
    }

    addCycle(startDate, endDate, deadline, name): Observable<string> {
      return Observable.create(observer=>{
        const data = new FormData();
        data.append('start_date', startDate);
        data.append('end_date', endDate);
        data.append('deadline', deadline);
        data.append('name', name);
      const http = new XMLHttpRequest();
      http.open('POST',this.domain + '/cycles/skills');
      http.setRequestHeader('Authorization', localStorage.getItem('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };   

      })
    }
    editCycle(id,startDate, endDate, deadline, name): Observable<string> {
      return Observable.create(observer=>{
        const data = new FormData();
        data.append('id', id);
        data.append('start_date', startDate);
        data.append('end_date', endDate);
        data.append('deadline', deadline);
        data.append('name', name);
      const http = new XMLHttpRequest();
      http.open('PUT',this.domain + '/cycles/edit');
      http.setRequestHeader('Authorization', localStorage.getItem('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };   

      })
    }
    deleteCycle(id): Observable<string> {
      return Observable.create(observer=>{
        const data = new FormData();
        data.append('id', id);
      const http = new XMLHttpRequest();
      http.open('DELETE',this.domain + '/cycles/delete');
      http.setRequestHeader('Authorization', localStorage.getItem('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };   

      })
    }



    sendEmail(type, email, body): Observable<string> {
      return Observable.create(observer=>{
        const data = new FormData();
        data.append('type', type);
        data.append('email', email);
        data.append('emailBody', body);
      const http = new XMLHttpRequest();
      http.open('POST',this.domain + '/admin/email');
      http.setRequestHeader('Authorization', localStorage.getItem('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };   

      })
    }
}
