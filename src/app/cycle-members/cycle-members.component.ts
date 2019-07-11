import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../Services/user.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-cycle-members',
  templateUrl: './cycle-members.component.html',
  styleUrls: ['./cycle-members.component.css']
})
export class CycleMembersComponent implements OnInit {

  users = [];
  members = [];
  members_temp = [];
  filteredMentees = [];
  filteredMentors = [];
  urlParam: any;
  cycleId: any;
  showMentors: boolean;
  showMentees: boolean;
  membersFetched = false;
  flag = false;
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
    this.showMentors = false;
    this.showMentees = false;
  }

  filter() {
    var i;
    this.members_temp = this.members;
    this.filteredMentees = this.filteredMentors = []

    if (this.showMentors) {
      for (i = 0; i < this.members.length; i++) {
        if (this.members[i].is_mentor)
          this.filteredMentors.push(this.members[i])
      }
    }
    if (this.showMentees) {
      for (i = 0; i < this.members.length; i++) {
        if (!this.members[i].is_mentor)
          this.filteredMentees.push(this.members[i])
      }
    }

    this.members_temp = []
    if (this.showMentees && this.showMentors) {
      this.members_temp = this.members;
    }
    else if (this.showMentors && !this.showMentees) {
      this.members_temp = this.filteredMentors
    }
    else if (this.showMentees && !this.showMentors) {
      this.members_temp = this.filteredMentees
    }
    else {
      this.members_temp = this.members;
    }
  }

  async getUsers() {
    this.users = await this.userService.getUsers();
    this.membersFetched = true;
    var i;

    for (i = 0; i < this.users.length; i++) {
      if (this.users[i].cycles.includes(this.cycleId))
        this.members.push(this.users[i])
    }
    this.members_temp = this.members;
  }

  public checkShowMentors() {
    this.filter();
  }
  public checkShowMentees() {
    this.filter();
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