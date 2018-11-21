import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../Services/questions.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

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
  validateForm: FormGroup;
  type: any;
  submitForm(): void {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.get(key).markAsDirty();
      this.validateForm.get(key).updateValueAndValidity();
    });
  }

  constructor(private fb: FormBuilder, private questionsService: QuestionsService, private route: ActivatedRoute, private message: NzMessageService) {

  }

  async ngOnInit() {
    try {
      this.route.queryParams
        .subscribe(async params => {
          this.type = params.type === 'mentee' ? 1 : 0;
          this.loading = true;
          this.questions = await this.questionsService.getQuestions(this.type);
          this.loading = false;
          this.questions.forEach(element => {
            let id = element.question_id
            let answer = { id: [] };
            this.answers.concat(answer)
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
  async submit(): void {
    let answersProps = Object.keys(this.answers);
    let answerMessage = [];
    for (let i = 0; i < answersProps.length; i++) {
      answerMessage.push({ questionId: answersProps[i], answer: this.answers[answersProps[i]] })
    }
    let is_mentor = this.type === 1 ? false : true;
    try {
    let res = await this.questionsService.submit({ is_mentor: is_mentor, answers: answerMessage });
    this.message.success('Submitted successfully ', { nzDuration: 10000 });
    this.reset = true;
    setTimeout(()=>{
      this.reset = false;
    }, 2000);
    } catch (error) {
      this.message.error('Error while submitting ', { nzDuration: 10000 });

    }
  }
  selectAnswer(answer): void {

  }
  changeAnswer(response) {
    const question_id = response.questionId;

    this.answers[question_id] = response.answer;
  }
}
