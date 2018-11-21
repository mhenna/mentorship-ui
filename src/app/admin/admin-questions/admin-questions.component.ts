import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.css']
})
export class AdminQuestionsComponent implements OnInit {

  questions: any[];
  constructor() { }

  ngOnInit() {
    this.questions = [];
  }

  addQuestionField() {
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
