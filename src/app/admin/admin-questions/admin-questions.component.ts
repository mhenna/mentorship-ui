import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.css']
})
export class AdminQuestionsComponent implements OnInit {

  questions: any[];
  index = 0;
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({});
    this.questions = [];
  }

  addQuestionField() {
    this.index++;
    const question = {
      type: 'MCQ',
      question: '',
      answers: []
    };
    this.questions.push(question);
  }

  addMCQOptionsToQuestion(question) {
    question.answers.push({
      answer: ''
    });
  }

  clearQuestion(question) {
    question.question = '';
    question.answers = [];
  }

}
