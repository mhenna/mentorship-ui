import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { AdminService} from '../Services/admin.service'

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  nameList = [{text:'mentor',value:true},
  {text:'mentee',value:false}];
  users: any = [];
  loading = false;
  displayData :any=[];
  sortName = null;
  sortValue = null;
  listOfSearchName = [];
  searchAddress: string;  

  constructor(private userService: UserService,
    private adminService: AdminService) { }
  async ngOnInit() {
    try {
      this.loading = true;
      this.users = await this.userService.getUsers();
      this.loading = false;
 this.displayData = [ ...this.users ];

      
    } catch (error) {
    }
    
  }
  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;    
    this.search();
  }
  deleteUser(id){

    this.adminService.deleteUser(id).subscribe(async (res) => {

      this.users = await this.userService.getUsers()

    }, (err) => {
      
    });
  }


  

  filter(listOfSearchName: string[], searchAddress: string): void {
    this.listOfSearchName = listOfSearchName;
    this.searchAddress = searchAddress;    
    this.search();
  }

  
 search(): void {
    /** filter data **/
    let data =[];
    if(this.listOfSearchName.length==0)
    {
      const filterFunc = item => (true);
      data = this.users.filter(item => filterFunc(item));
         }
    else{
    const filterFunc = item => (this.listOfSearchName.includes(item.is_mentor));
     data = this.users.filter(item => filterFunc(item));
    
    }
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }
}
