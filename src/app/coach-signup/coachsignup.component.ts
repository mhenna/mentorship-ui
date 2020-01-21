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
  question: string;
  possibleAnswers = []
  selectedAnswer: any;
  deletedAnswer: any;
  questions: any;
  answers: any[] = [];
  loading = true;
  reset = false;
  businessUnitExists = false
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
  numChoices: any
  skillsQuestionID = -1
  questionsFilled = false;
  employmentLevels = [];

  editForm = new FormGroup({

    employmentID: new FormControl('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ]),
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
      Validators.pattern("^[a-z0-9._%+-]+@(dell|emc|rsa)\.com$")
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
      //Validators.pattern('[a-zA-Z ]+')
    ]),
    empLevel: new FormControl('', [
      Validators.required,
      //Validators.pattern('[a-zA-Z ]+')
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
      this.businessUnits.push('Other')

      this.iscoachRanges.push('[1 - 3]')
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
      this.route.queryParams
        .subscribe(async params => {
          //this.type = params.type === 'forcoach' ? 0 : 1;
          this.type = params.type === 'mentee' ? 0 : 1;
          this.employmentLevels = await this.userservice.getEmpLevels(this.type);
          this.loading = true;
          if (this.type == 0)
            this.numChoices = 3
          else
            this.numChoices = 0
          this.questions = await this.questionsService.getSpecQuestions(this.type);

          this.loading = false;
          this.questions.forEach(element => {

            if (element.answers[0].text.includes("Career mentoring") && this.type === 0) {
              this.adminService.getSkills().subscribe(res => {
                for (var i = 0; i < res.length; i += 1) {
                  this.possibleAnswers.push(res[i].name)
                }
                element.answers[0].text = this.possibleAnswers
              });
            }

            else if (element.answers[0].text.includes("Career mentoring"))
              this.skillsQuestionID = element.id

            this.Response.push({ id: element.id, answer: [] })


            for (let i = 1; i < 4; i++) {
              let answer = element.answers[0].text[i]

              // this.answers.
            }

          });

        });
    } catch (error) {
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

    this.loading = true;
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
    let is_mentor = this.type === 1 ? false : true;
    try {
      for (let i = 0; i < this.Response.length; i++) {
        this.questionsService.submit(this.userid.id, this.Response[i].id, this.Response[i].answer)
        if (this.Response[i].id == this.skillsQuestionID) {
          this.Response[i].answer.forEach(a => {
            try {
              this.adminService.addSkill(a, "Technical").subscribe(res => {
                let addSkillRes = JSON.parse(res['response'])
                this.adminService.addSkilltoCycle(addSkillRes.id, this.currentCycleId).subscribe(res => {
                  console.log(res)
                })
              })
            } catch (error) {
              console.log("SKILL EXISTS ALREADY SO NO NEED TO ADD IT")
            }
          })
        }
      }
      this.reset = true;
      this.registered = true;

      setTimeout(() => {
        this.loading = false;
      }, 5000)
      setTimeout(() => {
        this.reset = false;
      }, 2000);
    } catch (error) {
    }
  }
  selectAnswer(answer): void {
  }
  changeAnswer(answer) {
    this.index++
    for (let i = 0; i < this.Response.length; i++) {

      if (answer.questionId == this.Response[i].id) {
        this.Response[i].answer.push(answer.item)
      }
    }
  }

  clearAnswers(answer) {
    for (let i = 0; i < this.Response.length; i++) {
      if (answer.questionId == this.Response[i].id) {
        this.Response[i].answer = []
      }
    }
  }

  editAnswer(answer) {

    for (let i = 0; i < this.Response.length; i++) {

      if (answer.questionId == this.Response[i].id) {
        this.Response[i].answer = answer.answer
      }
    }
  }
  logg() {
    let mentor = false
    if (!(this.editForm.get('employmentID').value == "" && this.editForm.get('firstName').value == "" && this.editForm.get('lastName').value == "" &&
      this.editForm.get('email').value == "" && this.editForm.get('yearsExperience').value == "" && this.editForm.get('yearsOrganization').value == "" &&
      this.editForm.get('yearsInRole').value == "", this.editForm.get('department').value == "", this.editForm.get('position').value == "",
      this.editForm.get('location').value == "" && this.editForm.get('directManager').value == "" && this.editForm.get('empLevel').value == "") && 
      !this.editForm.get('employmentID').errors && !this.editForm.get('firstName').errors &&
      !this.editForm.get('lastName').errors && !this.editForm.get('email').errors && !this.editForm.get('yearsExperience').errors &&
      !this.editForm.get('yearsOrganization').errors && !this.editForm.get('yearsInRole').errors && !this.editForm.get('department').errors &&
      !this.editForm.get('position').errors && !this.editForm.get('directManager').errors && !this.editForm.get('empLevel').errors) {

      if (this.type == 1) {
        mentor = true;
      }

      this.loading = true;
      this.userservice.addUser(this.editForm.get('employmentID').value,this.editForm.get('firstName').value, this.editForm.get('lastName').value,
        this.editForm.get('email').value, mentor, this.coaching, this.editForm.get('yearsExperience').value, this.editForm.get('yearsOrganization').value,
        this.editForm.get('yearsInRole').value, this.editForm.get('department').value, this.editForm.get('position').value,
        this.editForm.get('location').value, this.editForm.get('directManager').value, this.currentCycleId, this.editForm.get('capacity').value, this.editForm.get('empLevel').value).subscribe(async (res) => {
          if (res['status'] == '201') {
            this.userid = await this.userservice.getUser(this.editForm.get('email').value)
            this.flag = false;
            if (this.businessUnitExists)
              this.businessUnitNotListed(this.editForm.get('department').value)

            this.editForm.reset()

            this.ex = 1
            this.questionsFilled = true
          }
          else {
            this.flag = true
            try {
              let e = JSON.parse(res['responseText'])
              alert(e['non_field_errors'][0])
            } catch (err) {
              alert('No cycle available for registration')
            }
          }
          this.loading = false;
        }, err => {
          console.log(err)
        })
    }
    else {
      this.error = true;
    }
  }
  afterClose() {
    this.error = false;
  }

  getCycles() {
    this.adminService.getCycles().subscribe(async (res) => {

      this.cycles = await res
      this.cyclesFetched = true;

      var now = new Date()

      var i;

      for (i = 0; i < this.cycles.length; i++) {
        if (now >= new Date(this.cycles[i].start_date) && now <= new Date(this.cycles[i].end_date)) {
          this.current = true;
          this.currentCycleId = this.cycles[i].id
        }
      }
    }, (err) => {

    });
  }

  toggleBU() {
    this.businessUnitExists = true
  }
  async businessUnitNotListed(businessUnit) {
    await this.userservice.businessUnitNotListed(businessUnit).subscribe(res => {
    })

    // alert('We have received your email, please continue with the signup form and select the "Other" option for business unit')
  }
}
