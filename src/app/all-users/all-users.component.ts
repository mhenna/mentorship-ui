import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { AdminService} from '../Services/admin.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
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
  usersFetched = false;
  searchAddress: string;  
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  constructor(private userService: UserService,
    private adminService: AdminService,
    ) { }
  async ngOnInit() {
    try {
      this.loading = true;
      // this.data.currentMessage.subscribe(message => this.users = message)
      this.userService.getUsers().subscribe(users =>{
        this.users = users
        this.displayData = [ ...this.users ];
        this.usersFetched = true;
        this.loading=false;
      })
     
    } catch (error) {
    }
    
  }
  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;    
    this.search();
  }
  deleteUser(id){

    this.loading = true
    this.adminService.deleteUser(id).subscribe(async (res) => {

      this.userService.getUsers().subscribe(async users =>{
        this.displayData = await users
        this.loading = false
      })

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

  async download() {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "Users");

  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
  }
}
