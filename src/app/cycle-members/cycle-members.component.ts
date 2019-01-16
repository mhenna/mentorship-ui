import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-cycle-members',
  templateUrl: './cycle-members.component.html',
  styleUrls: ['./cycle-members.component.css']
})
export class CycleMembersComponent implements OnInit {

  users = [];
  members = [];
  urlParam : any;
  cycleId : any;
  membersFetched = false;

  constructor(private userService: UserService,
    private route: ActivatedRoute) { 
      this.route.params.subscribe( params => this.urlParam = params );
      var temp = Object.values(this.urlParam)[0];
      this.cycleId = parseInt(temp.toString(), 10)
    }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    this.users = await this.userService.getUsers();
    this.membersFetched = true;
    var i;

    for (i = 0; i < this.users.length; i++) {
      if (this.users[i].cycles.includes(this.cycleId))
        this.members.push(this.users[i])
    }
    console.log(this.members)
  }
}
