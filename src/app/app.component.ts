import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderButtonsService } from './Services/header-buttons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mentorship-ui';
  showSide = false;
  showSideAdmin = false;
  constructor(router: Router, headerService: HeaderButtonsService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if ( val.url.includes('admin') && !val.url.includes('login')) {
          this.showSide = false;
          this.showSideAdmin = true;
        } else if ((val.url.includes('admin') && val.url.includes('login'))||val.url.includes('unauthorized')){
          this.showSide = false;
          this.showSideAdmin = false;
        }else {
          this.showSide = true;
          this.showSideAdmin = false;
        }

        if (val.url.includes('unauthorized'))
          headerService.setUnauthorized()
      
          if ( val.url.includes('admin') && val.url.includes('login'))
            headerService.setAuthorized()
      }
    });
  }
}
