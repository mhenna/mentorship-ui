import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../Services/questions.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '../Services/user.service';
import { HeaderButtonsService } from '../Services/header-buttons.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './coachsignup.component.html',
  styleUrls: ['./coachsignup.component.css']
})
export class CoachSignupComponent implements OnInit {
  isLoadingOne = false;
  private question: string;
  private possibleAnswers: any[];
  private selectedAnswer: any;
  private deletedAnswer: any;
  private questions: any;
  private answers: any[] = [];
  private loading = false;
  private reset = false;
  error = false;
  registered = false;
  validateForm: FormGroup;
  flag = true;
  index = 0;
  tab: any;
  ex: any;
  type: any;
  coaching = false;
  radioValue = "a";
  userid: any;
  Response: any[] = [];
  ResponseFinal: any[] = [];
  cycles = [];
  cyclesFetched = false;
  current = false;
  currentCycleId: any;
  businessUnits = []
  iscoachRanges = []
  forcoachRanges = []
  selectedBU: string
  aykalam:string

  editForm = new FormGroup({

    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+')
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@(dell|emc)\.com$")
    ]),
    yearsExperience: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ]),
    yearsOrganization: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ]),
    yearsInRole: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ]),
    capacity: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ]),
    department: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+')
    ]),
    position: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+')
    ]),
    location: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+')
    ]),
    directManager: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+')
    ]),
    iscoach: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+')
    ]),


  });
  submitForm(): void {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.get(key).markAsDirty();
      this.validateForm.get(key).updateValueAndValidity();
    });
  }

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder,
    private headerButtonsService: HeaderButtonsService,
    private questionsService: QuestionsService,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    private route: ActivatedRoute, private message: NzMessageService, private userservice: UserService) {

  }
  async ngOnInit() {
    try {
      this.businessUnits = await this.userservice.getBusinessUnits();

      this.iscoachRanges.push('[3 - 5]')
      this.iscoachRanges.push('[5 - 7]')
      this.iscoachRanges.push('[7 - 9]')
      this.iscoachRanges.push('9 +')

      this.forcoachRanges.push('[0 - 1]')
      this.forcoachRanges.push('[1 - 3]')
      this.forcoachRanges.push('[3 - 5]')
      this.forcoachRanges.push('5 +')

      this.selectedBU = ''
      this.getCycles()
      this.headerButtonsService.signOut();
      this.localStorageService.remove('token')
      console.log(this.flag, "FLAG")
      this.route.queryParams
        .subscribe(async params => {
          //this.type = params.type === 'forcoach' ? 0 : 1;
          this.type = params.type === 'mentee' ? 0 : 1;
          this.loading = true;

          this.questions = await this.questionsService.getSpecQuestions(this.type);
          console.log(this.questions, "kkkkk")
          this.loading = false;
          this.questions.forEach(element => {
            // let id = element.question_id
            this.Response.push({ id: element.id, answer: [] })

            
            for (let i = 1; i < 4; i++) {
              console.log(element.answers[0].text[i])
              let answer = element.answers[0].text[i]

              // this.answers.
            }

          });

        });
    } catch (error) {
      console.log(error);
    }
  }
  loadOne(): void {
    this.isLoadingOne = true;
    setTimeout(_ => {
      this.isLoadingOne = false;
    }, 5000);
    this.submit();
  }
  async submit() {


    let answersProps = Object.keys(this.questions[0].answers);

    let answerMessage = [];
    for (let i = 0; i < answersProps.length; i++) {

      answerMessage.push({ questionId: answersProps[i], answer: this.answers[answersProps[i]] })
    }
    for (let i = 0; i < this.Response.length; i++) {
      for (let j = 0; i < this.Response[i].length; i++) {
        this.Response[i].answer[j].id = j + 1;
      }
    }

    //let is_iscoach = this.type === 1 ? false : true;
    let is_mentor = this.type === 1 ? false : true;
    try {
      for (let i = 0; i < this.Response.length; i++) {

        this.questionsService.submit(this.userid.id, this.Response[i].id, this.Response[i].answer)


      }

      // this.message.success('Submitted successfully ', { nzDuration: 10000 });
      this.reset = true;
      this.registered = true;
      // for (let i = 0; i < this.Response.length; i++) {

      //   this.Response[i].answer.length = 0;
      //   }

      setTimeout(() => {
        this.reset = false;
      }, 2000);
    } catch (error) {
      // this.message.error('Error while submitting ', { nzDuration: 10000 });

    }
  }
  selectAnswer(answer): void {
    console.log(answer, "ANSWER")


  }
  changeAnswer(answer) {
    this.index++
    for (let i = 0; i < this.Response.length; i++) {

      if (answer.questionId == this.Response[i].id) {
        

        console.log(this.index, "1")
        this.Response[i].answer.push(answer.item)

        // this.Response[i].answer=answer.answer

      }
    }
    console.log(this.Response, "RRRRRRR")
  }

  clearAnswers(answer){
    console.log("ClearAnswers()")
    for (let i = 0; i < this.Response.length; i++) {
      if (answer.questionId == this.Response[i].id) {
        this.Response[i].answer = []
        console.log(this.Response[i].answer, 'Answers Cleared')
      }
    }
  }

  editAnswer(answer) {

    for (let i = 0; i < this.Response.length; i++) {

      if (answer.questionId == this.Response[i].id) {


        console.log(this.index, "1")
        this.Response[i].answer = answer.answer
        console.log(this.Response[i].answer, 'EDITED')
        // this.Response[i].answer=answer.answer

      }
    }
  }
  logg() {

    // let iscoach = false
    let mentor = false
    // console.log('#######################################')
    // console.log('#######################################')
    // console.log(this.editForm.get('yearsExperience').value)
    // console.log(this.aykalam)
    if (!(this.editForm.get('firstName').value == "" && this.editForm.get('lastName').value == "" &&
      this.editForm.get('email').value == "" && this.editForm.get('yearsExperience').value == "" && this.editForm.get('yearsOrganization').value == "" &&
      this.editForm.get('yearsInRole').value == "", this.editForm.get('department').value == "", this.editForm.get('position').value == "",
      this.editForm.get('location').value == "" && this.editForm.get('directManager').value == "") && !this.editForm.get('firstName').errors &&
      !this.editForm.get('lastName').errors && !this.editForm.get('email').errors && !this.editForm.get('yearsExperience').errors &&
      !this.editForm.get('yearsOrganization').errors && !this.editForm.get('yearsInRole').errors && !this.editForm.get('department').errors &&
      !this.editForm.get('position').errors && !this.editForm.get('directManager').errors) {
      console.log("***********NO ERROR*************")
      this.flag = false;
      if (this.type == 1) {
        //iscoach = true;
        mentor = true;
        console.log(mentor, "is mentor")
      }



      this.userservice.addUser(this.editForm.get('firstName').value, this.editForm.get('lastName').value,
        this.editForm.get('email').value, mentor, this.coaching, this.editForm.get('yearsExperience').value, this.editForm.get('yearsOrganization').value,
        this.editForm.get('yearsInRole').value, this.editForm.get('department').value, this.editForm.get('position').value,
        this.editForm.get('location').value, this.editForm.get('directManager').value, this.currentCycleId, this.editForm.get('capacity').value).subscribe(async (res) => {
          console.log("______________________________-------------------", this.currentCycleId)
          this.userid = await this.userservice.getUser(this.editForm.get('email').value)
          this.editForm.reset()

          this.ex = 2

        })
    }
    else {
      console.log("****************ERROR******************")
      console.log(this.editForm.get('department').value)
      // if (this.type == 1) {
      //   console.log("iscoach")
      // }
      // else {
      //   console.log("forcoach")
      // }
      if (this.type == 1) {
        console.log("mentor")
      }
      else {
        console.log("mentee")
      }
      this.error = true;
    }

    // console.log(this.editForm.dirty,this.editForm.errors,'HEEERRREE')
  }
  afterClose() {
    this.error = false;
  }

  getCycles() {
    this.adminService.getCycles().subscribe(async (res) => {

      this.cycles = await res
      this.cyclesFetched = true;

      // console.log("*****CYCLES", this.cycles)
      //console.log("***************HELLLLLLOOOOOOOOOOO", this.cycles[0].start_date.toISOString())

      var now = new Date()

      var i;

      for (i = 0; i < this.cycles.length; i++) {
        if (now >= new Date(this.cycles[i].start_date) && now <= new Date(this.cycles[i].end_date)) {
          this.current = true;
          this.currentCycleId = this.cycles[i].id
          // console.log("INSIDE IF")
        }
        // console.log("iteration number ", i, " cycle id ", this.cycles[i].id)
      }

      console.log(this.currentCycleId, "**************")

    }, (err) => {

    });
  }
}
