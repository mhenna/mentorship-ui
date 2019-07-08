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
    this.questionLoading=false;
    this.qs = await this.questionservice.getQuestions(true)
    console.log('RETRIEVED QUESTIONs', this.qs)
    // this.questionservice.editQuestion(this.qs[0]).subscribe(res => {
    //   console.log("THIS IS RES", res)
    // })
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

  addPossibleAnswer(all_answers) {
    console.log('THIS IS THE PARAMETER', all_answers)

    all_answers.push('')
  }

  removePossibleAnswer(all_answers, index) {
    console.log(index)
    all_answers.splice(index, 1)
    console.log('ANSWERS AFTER POP', all_answers)
  }

  clearQuestion(question) {
    question.question = '';
    question.answers = [];
  }

  async submit() {
    console.log("submit")
    let a = []

    var i = 0
    for (i=0; i < this.questions[0].answers.length; i++)
      a.push(this.questions[0].answers[i].answer)
    
    console.log('hellllllll', a)
    console.log('THIS IS AAAAAAAAAAAAAAAAAA', a[0])
    this.questionLoading = true;
    await this.questionservice.submitQuestion(this.questions[0].text, this.questions[0].matching, this.questions[0].mentor, this.questions[0].userInfo, this.questions[0].type, a).subscribe(async res => {
      console.log('THIS IS QUESTION RES', res);
      console.log(JSON.parse(res).id)
      // console.log(this.questions[0].answers)
      await this.questionservice.submitPossibleAnswersToQuestion(JSON.parse(res).id, true, a)
      this.qs = await this.questionservice.getQuestions(true)
      await this.questions.pop();
      this.questionLoading=false;
      // window.location.reload();
    })
  }

  getLoading() : Boolean {
    return this.questionLoading;
  }
  editQuestion() {
   
    let answersToEdit = JSON.parse(JSON.stringify(this.questionToEdit)).answers[0].text
    let answerId = JSON.parse(JSON.stringify(this.questionToEdit)).answers[0].id

    this.isVisible = false;
    this.questionLoading = true;
    this.questionservice.editQuestion(JSON.parse(JSON.stringify(this.questionToEdit))).subscribe( async res => {
      await this.questionservice.editAnswersToQuestion(answerId, answersToEdit)
      this.qs = await this.questionservice.getQuestions(true)
      this.questionLoading = false;
    })
  }

  showModal(question): void {
    this.isVisible = true;
    this.questionToEdit = question
    // console.log(JSON.parse(JSON.stringify(this.questionToEdit)).answers[0].text)
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
