import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../Services/user.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cycle-members',
  templateUrl: './cycle-members.component.html',
  styleUrls: ['./cycle-members.component.css']
})
export class CycleMembersComponent implements OnInit {

  users = [];
  members = [];
  urlParam: any;
  cycleId: any;
  membersFetched = false;
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  constructor(private userService: UserService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.urlParam = params);
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


  async download() {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.members);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "Members");

  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
  }

}