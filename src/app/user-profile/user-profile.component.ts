import { Component, OnInit } from '@angular/core';
import {UserService} from '../Services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
user_id: any ;
questions:any=[];
tempQuestions:any={};
  constructor(private userService:UserService, private route: ActivatedRoute) { }

 async ngOnInit() {
  await this.route.queryParams
  .subscribe(async params => {
   this.user_id= params.id ;
    
  });
    let response = await this.userService.getUser(this.user_id);
    await response.answers.forEach(element => {
      console.log('questionnnn',element.text)
      this.tempQuestions[element.answer_to_question.question_id] = this.tempQuestions[element.question_id]===undefined?[element.text]:this.questions[element.question_id].push(element.text)
    });
    await response.answers.forEach(element => {
      let answers =this.tempQuestions[element.answer_to_question.question_id];
      this.questions.push({question_id:element.answer_to_question.question_id,question_text:element.answer_to_question.question_text,answers:answers})
          });

console.log('questionsss',this.questions)
  }

}
