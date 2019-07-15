import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  skills: any

  constructor(private adminService: AdminService) { }
  async ngOnInit() {
    this.adminService.getSkills().subscribe(res => {

      this.skills = res;
      console.log(this.skills, res)


    })




  }

}
