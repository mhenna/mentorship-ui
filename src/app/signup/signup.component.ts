import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../Services/questions.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

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
  validateForm: FormGroup;
  type: any;
  submitForm(): void {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.get(key).markAsDirty();
      this.validateForm.get(key).updateValueAndValidity();
    });
  }

  constructor(private fb: FormBuilder, private questionsService: QuestionsService, private route: ActivatedRoute) {

  }

  async ngOnInit() {
    try {
      this.route.queryParams
        .subscribe(async params => {
          this.type = params.type === 'mentee' ? 1 : 0;
          this.questions = await this.questionsService.getQuestions(this.type);
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
  submit(): void {
    let answersProps = Object.keys(this.answers);
    let answerMessage = [];
    for (let i = 0; i < answersProps.length; i++) {
      answerMessage.push({ questionId: answersProps[i], answer: this.answers[answersProps[i]] })
    }
    let is_mentor = this.type === 1 ? false : true;
    this.questionsService.submit({ is_mentor: is_mentor, answers: answerMessage });
  }
  selectAnswer(answer): void {

  }
  changeAnswer(response) {
    let question_id = response.questionId;
    
    this.answers[question_id] = response.answer;
  }
}
