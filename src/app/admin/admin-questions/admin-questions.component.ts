import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { QuestionsService } from '../../Services/questions.service';

@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.css']
})
export class AdminQuestionsComponent implements OnInit {

  questions: any[];


  constructor(private questionservice: QuestionsService) { }

  ngOnInit() {
    this.questions = [];
  }

  addQuestionField() {
    const question = {
      type: 'MCQ',
      text: '',
      matching: '',
      mentor: false,
      userInfo: '',
      answers: ''
    };
    this.questions.push(question);
  }

  addMCQOptionsToQuestion(question) {
    question.answers.push({
      answer: ''
    });
    console.log(question)
  }

  clearQuestion(question) {
    question.question = '';
    question.answers = [];
  }

  submit() {
    console.log("submit")
    this.questionservice.submitQuestion(this.questions[0].text, this.questions[0].matching, this.questions[0].mentor, this.questions[0].userInfo, this.questions[0].type).subscribe(res => {

      console.log(res);

    })
  }

}
