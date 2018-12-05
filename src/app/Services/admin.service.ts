import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AdminService {
  public headers: Headers = new Headers();
  public domain = environment.apiUrl;

  constructor(private http: Http) { }

  iniviteMentor(email): Observable<any> {
    this.headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
    return this.http.post(this.domain + '/admin/invite',{email}, {headers: this.headers});
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
}
