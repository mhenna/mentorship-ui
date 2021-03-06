import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderButtonsService {

  public isSignedIn = new BehaviorSubject(false);
  public unauthorized = new BehaviorSubject(false);

  
  constructor(private router: Router) { }


  setIsSignedIn() {
    this.isSignedIn.next(true);
}

signOut()
{
    this.isSignedIn.next(false); 
}

setUnauthorized() {
  this.unauthorized.next(true);
}

setAuthorized() {
  this.unauthorized.next(false);
}

}
