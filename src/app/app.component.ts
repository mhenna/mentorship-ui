import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mentorship-ui';
  showSide = true;
  showSideAdmin = false;
  constructor(router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/' || val.url.includes('admin') || val.url.includes('user')) {
          this.showSide = false;
          this.showSideAdmin = true;
        } else {
          this.showSide = true;
          this.showSideAdmin = false;
        }
      }
    });
  }
}
