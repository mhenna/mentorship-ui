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
  isVisible = false;
  questionToEdit = ''
  answersToEdit = []
  answerEdited = ''
  questionLoading = false;

  constructor(private questionservice: QuestionsService) { }

  async ngOnInit() {
    this.questionLoading = false;
    this.qs = await this.questionservice.getQuestions(true)
    this.questions = [];
  }

  addQuestionField() {
    const question = {
      type: 'MCQ',
      text: '',
      matching: false,
      mentor: false,
      userInfo: '',
      answers: []
    };
    this.questions.push(question);
  }

  addMCQOptionsToQuestion(question) {
    question.answers.push({
      answer: ''
    });
  }

  addPossibleAnswer(all_answers) {
    all_answers.push('')
  }

  removePossibleAnswer(all_answers, index) {
    all_answers.splice(index, 1)
  }

  clearQuestion(question) {
    question.question = '';
    question.answers = [];
  }

  async submit() {
    let a = []

    var i = 0
    for (i = 0; i < this.questions[0].answers.length; i++)
      a.push(this.questions[0].answers[i].answer)

    this.questionLoading = true;
    await this.questionservice.submitQuestion(this.questions[0].text, this.questions[0].matching, this.questions[0].mentor, this.questions[0].userInfo, this.questions[0].type, a).subscribe(async res => {
      await this.questionservice.submitPossibleAnswersToQuestion(JSON.parse(res).id, true, a)
      this.qs = await this.questionservice.getQuestions(true)
      await this.questions.pop();
      this.questionLoading = false;
    })
  }

  getLoading(): Boolean {
    return this.questionLoading;
  }
  editQuestion() {

    let answersToEdit = JSON.parse(JSON.stringify(this.questionToEdit)).answers[0].text
    let answerId = JSON.parse(JSON.stringify(this.questionToEdit)).answers[0].id

    this.isVisible = false;
    this.questionLoading = true;
    this.questionservice.editQuestion(JSON.parse(JSON.stringify(this.questionToEdit))).subscribe(async res => {
      await this.questionservice.editAnswersToQuestion(answerId, answersToEdit)
      this.qs = await this.questionservice.getQuestions(true)
      this.questionLoading = false;
    })
  }

  showModal(question): void {
    this.isVisible = true;
    this.questionToEdit = question
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  indexTracker(index: number, answer: any) {
    return index;
  }

}