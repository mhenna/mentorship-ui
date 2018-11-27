import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { AdminService} from '../Services/admin.service'

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: any = [];
  loading = false;
  constructor(private userService: UserService,
              private adminService: AdminService) { }

  async ngOnInit() {
    try {
      this.loading = true;
      this.users = await this.userService.getUsers();
      this.loading = false;
    } catch (error) {
    }
  }
  deleteUser(id){

    this.adminService.deleteUser(id).subscribe(async (res) => {

      this.users = await this.userService.getUsers()

    }, (err) => {
      
    });
  }


  

}
