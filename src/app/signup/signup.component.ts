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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoadingOne = false;
  private question: string;
  private possibleAnswers: any[];
  private selectedAnswer: any;
  private questions: any;
  private answers: any[] = [];
  private loading = false;
  private reset = false;
  error = false;
  validateForm: FormGroup;
  flag = true;
  index = 0;
  tab:any;
  type: any;
  radioValue="a";
  userid:any;
  Response: any[] = [];
  ResponseFinal: any[] = [];
  editForm = new FormGroup({

    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    yearsExperience: new FormControl('', [Validators.required]),
    yearsOrganization: new FormControl('', [Validators.required]),
    yearsInRole: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    directManager: new FormControl('', [Validators.required]),
    mentor: new FormControl('', [Validators.required]),


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
    private route: ActivatedRoute, private message: NzMessageService, private userservice: UserService) {

  }

  async ngOnInit() {
    try {
      this.headerButtonsService.signOut();
      this.localStorageService.remove('token')
      console.log(this.flag, "FLAG")
      this.route.queryParams
        .subscribe(async params => {
          this.type = params.type === 'mentee' ? 1 : 0;
          this.loading = true;
          this.questions = await this.questionsService.getQuestions(this.type);
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

    let is_mentor = this.type === 1 ? false : true;
    try {
      for (let i = 0; i < this.Response.length; i++) {

        this.questionsService.submit(this.userid.id,this.Response[i].id, this.Response[i].answer)
        
        
      }

      this.message.success('Submitted successfully ', { nzDuration: 10000 });
      // this.reset = true;
      // for (let i = 0; i < this.Response.length; i++) {

      //   this.Response[i].answer.length = 0;
      //   }

      setTimeout(() => {
        this.reset = false;
      }, 2000);
    } catch (error) {
      this.message.error('Error while submitting ', { nzDuration: 10000 });

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
  logg() {

    let mentor = false
    if (!(this.editForm.get('firstName').value == "" && this.editForm.get('lastName').value == "" &&
      this.editForm.get('email').value == "" && this.editForm.get('yearsExperience').value == "" && this.editForm.get('yearsOrganization').value == "" &&
      this.editForm.get('yearsInRole').value, this.editForm.get('department').value, this.editForm.get('position').value,
      this.editForm.get('location').value == "" && this.editForm.get('directManager').value == "")) {
      this.flag = false;
      if (this.type == 0) {
        mentor = true;
        console.log(mentor,"MENTOR")
      }
      this.userservice.addUser(this.editForm.get('firstName').value, this.editForm.get('lastName').value,
        this.editForm.get('email').value, mentor, this.editForm.get('yearsExperience').value, this.editForm.get('yearsOrganization').value,
        this.editForm.get('yearsInRole').value, this.editForm.get('department').value, this.editForm.get('position').value,
        this.editForm.get('location').value, this.editForm.get('directManager').value).subscribe(async (res) => {
          this.userid = await this.userservice.getUser(this.editForm.get('email').value)

        })

    }
    else {
      console.log(this.radioValue,"MENTOR")
      this.error = true;
    }

    // console.log(this.editForm.dirty,this.editForm.errors,'HEEERRREE')
  }
  afterClose() {
    this.error = false;
  }
}
