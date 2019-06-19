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
  qs: any[];

  constructor(private questionservice: QuestionsService) { }

  async ngOnInit() {
    this.qs = await this.questionservice.getQuestions(true)
    console.log('RETRIEVED QUESTIONs', this.qs)
    this.questionservice.editQuestion(this.qs[0]).subscribe(res => {
      console.log("THIS IS RES", res)
    })
    this.questions = [];
  }

  addQuestionField() {
    const question = {
      type: 'MCQ',
      text: '',
      matching: false,
      mentor: false,
      userInfo: '',
      answers :[]
    };
    this.questions.push(question);
  }

  addMCQOptionsToQuestion(question) {
    console.log(question, "HLLLLLLLLLLLLLLLL")
    question.answers.push({
      answer: ''
    });
  }

  clearQuestion(question) {
    question.question = '';
    question.answers = [];
  }

  submit() {
    console.log("submit")
    let a = []

    var i = 0
    for (i=0; i < this.questions[0].answers.length; i++)
      a.push(this.questions[0].answers[i].answer)
    
    console.log('hellllllll', a)
    this.questionservice.submitQuestion(this.questions[0].text, this.questions[0].matching, this.questions[0].mentor, this.questions[0].userInfo, this.questions[0].type, a).subscribe(res => {

      console.log('THIS IS QUESTION RES', res);
      // console.log(this.questions[0].answers)
      this.questionservice.submitPossibleAnswersToQuestion(this.questions[0].id, true, this.questions[0].answers).subscribe(res => {
        console.log(res)
      })
    })
  }

}
