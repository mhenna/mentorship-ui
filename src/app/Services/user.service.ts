import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Dates } from 'date-format';
import { Observable } from 'rxjs';
import "rxjs";

import { environment } from '../../environments/environment';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
    ) {
  }
  getUser(user_id): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*');
      this.http.get(environment.apiUrl + `/users/user/${user_id}`, {headers: reqHeaders})
      .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  getBusinessUnits(): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*')
      this.http.get(environment.apiUrl + `/users/getBUs`, { headers: reqHeaders })
        .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  getEmpLevels(): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*')
      this.http.get(environment.apiUrl + `/users/getEmpLevels`, { headers: reqHeaders })
        .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  getUsers(): Observable<any>  {
    
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*');
      return this.http.get(environment.apiUrl + `/users/users`, { headers: reqHeaders });
  }

  getUsersEmail(): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*');
      this.http.get(environment.apiUrl + `/users/getUserEmails`, {headers: reqHeaders})
        .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  businessUnitNotListed(businessUnit): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('businessUnit', businessUnit)
      const http = new XMLHttpRequest();
      http.open('POST',environment.apiUrl + '/users/business-unit-not-listed');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http.status);
        observer.complete();
      };
    })
  }
  addUser(fname,lname,email,mentor, coaching, yearsExp,yearsOrg,yearsRole,dept,pos,loc,manager,cycleId, hour, empLevel): Observable<string> {
    return Observable.create(observer => {
      const data = new FormData();
      data.append('first_name',fname);
      data.append('last_name',lname);
      data.append('email', email);
      data.append('is_mentor', mentor);
      data.append('coaching', coaching)
      data.append('direct_manager',manager);
      data.append('years_of_experience',yearsExp);
      data.append('years_in_role',yearsRole);
      data.append('years_within_organization',yearsOrg);
      data.append('departement', dept);
      data.append('position', pos);
      data.append('location',loc);
      data.append('cycles', cycleId);
      data.append('capacity', hour);
      data.append('coaching',coaching);
      data.append('empLevel', empLevel);
      data.append('now', new Date().toISOString());
      const http = new XMLHttpRequest();
      http.open('POST',environment.apiUrl + '/users/users');
      http.setRequestHeader('Authorization', this.localStorage.get('token'))
      http.send(data);
      http.onload = () => {
        observer.next(http);
        observer.complete();
      };

    })
  }
  matchUsers(menteeId,mentorId): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*');
      this.http.post(environment.apiUrl + `/users/match`, {'mentorId':mentorId,'menteeId':menteeId},{headers: reqHeaders})
      .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  unMatchUsers(menteeId,mentorId): Promise<any> {
    return new Promise((resolve, reject) => {
      const reqHeaders: HttpHeaders = new HttpHeaders();
      console.log('HIIIIIIIIIIIIIIIIIII', menteeId, '      ', mentorId)
      reqHeaders.append('Content-Type', 'application/json');
      reqHeaders.append('Access-Control-Allow-Origin', '*');
      this.http.post(environment.apiUrl + `/users/unmatch`, {'mentorId':mentorId,'menteeId':menteeId},{headers: reqHeaders})
      .subscribe((data) => resolve(data), err => reject(err));
    });
  }
  mentorScore(): Observable<any> {
   
      const reqHeaders: HttpHeaders = new HttpHeaders();
      reqHeaders.set('Authorization', this.localStorage.get('token'));
     return this.http.get(environment.apiUrl + '/users/score', {headers: reqHeaders})
      .pipe(
        map((res) => {
          return res;
        }));
    }
 
}
