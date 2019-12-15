import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { NzFormatEmitEvent } from 'ng-zorro-antd';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-mentor-scores',
  templateUrl: './mentor-scores.component.html',
  styleUrls: ['./mentor-scores.component.css']
})
export class MentorScoresComponent implements OnInit {
  match: any
  users: any
  membersFetched: any
  mentees: any
  matches: any
  mentors: any
  loading = true
  list: any
  mentorsMap: any
  pageIndex: number = 1
  pageIndexMentors: number = 1
  sortName = null;
  sortValue = null;
  displayData: any
  mentorPageSize: number = 5;
  pageSize: number = 10
  showAllMentorScores = false;
  selectedMenteeMentors: any;
  selectedMenteeId: any;
  mentorsWithMaxCapacity = []


  constructor(
    private UserService: UserService,
  ) { }

  async ngOnInit() {

    this.mentorsMap = {}
    this.mentors = []
    this.matches = {}
    this.membersFetched = false
    this.loading = true
    this.pageIndex = 1
    this.UserService.mentorScore().subscribe(async res => {
      this.match = res
      this.mentorsWithMaxCapacity = this.match.pop()
      this.UserService.getUsers().subscribe(async users => {
        this.users = users
        await this.loadData();
      })
    })
  }


  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  async loadData() {

    try {
      if (this.users !== undefined) {
        this.membersFetched = true
        this.loading = false
        this.list = this.users.reduce((map, obj) => {
          map.set(obj.id, obj);
          return map;
        }, new Map());

        this.match.forEach(element => {

          try {
            if (this.list.get(element.mentee.id) !== undefined) {
              let currentMentorId = this.list.get(element.mentee.id).matched[0]
              element['currentMentor'] = this.list.get(currentMentorId) == undefined ? "" : this.list.get(currentMentorId).email
              element.mentee.mentors.forEach(mentor => {
                if (!this.mentorsMap.hasOwnProperty(mentor.id)) {
                  let menteeData = this.list.get(mentor.id).matched.map(eachMentee => {
                    return this.list.get(eachMentee)
                  });
                  mentor.data['mentees'] = menteeData
                  this.mentors.push(mentor)
                }
                this.mentorsMap[mentor.id] = mentor
              })
            }
          } catch (err) {
            console.log(err)
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }


  refreshUsers(): any {
    this.UserService.getUsers().subscribe(users => {
      this.users = users
    })
  }

  isMenteeCapacityFull(mentor) {
    if (this.mentorsWithMaxCapacity.includes(mentor))
      return true;
    return false;
  }

  async choose(menteeID, mentorID) {
    this.membersFetched = false;
    this.showAllMentorScores = false;
    let menteeUser = this.users.find(user => {
      if (user.id == menteeID)
        return user
    })

    this.matches[menteeID] = { "menteeId": menteeID, "mentorId": mentorID }
    if (menteeUser.matched.length > 0) {
      this.UserService.unMatchUsers(menteeID, menteeUser.matched[0]).then(() => {
        this.UserService.matchUsers(menteeID, mentorID).then(() => {
          this.membersFetched = true;
          window.location.reload()
        })
      })
    }
    else {
      this.UserService.matchUsers(menteeID, mentorID).then(() => { this.membersFetched = true; window.location.reload() })
    }
    // this.UserService.getUsers().subscribe(users => {
    //   this.users = users
    // })
    // this.match = await this.UserService.mentorScore();
    // await this.loadData()
    // this.membersFetched = true;
    // window.location.reload()
  }

  changePageIndex(event) {
    this.pageIndex = event;
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search() {
    console.log(this.sortValue)
    if (this.sortName && this.sortValue) {
      this.displayData = this.match.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    } else {
      this.displayData = this.match;
    }
  }

  showMentorScores(menteeMentors, menteeId) {
    this.selectedMenteeMentors = menteeMentors;
    this.selectedMenteeId = menteeId;
    this.showAllMentorScores = true;
  }

  hideMentorScores() {
    this.showAllMentorScores = false;
  }
}
