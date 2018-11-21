import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user_id: any;
  questions: any = [];
  tempQuestions: any = {};
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.route.queryParams
      .subscribe(async params => {
        this.user_id = params.id;
        const response = await this.userService.getUser(this.user_id);
         response.answers.forEach(element => {
           if (this.tempQuestions[element.answer_to_question.question_text] === undefined) {
            this.tempQuestions[element.answer_to_question.question_text] = [element.text];
           } else {
            this.tempQuestions[element.answer_to_question.question_text].push(element.text);
           }
        });
        //  response.answers.forEach(element => {
        //   const answers = this.tempQuestions[element.answer_to_question.question_text];
        //   this.questions.push({ question_text: element.answer_to_question.question_text, answers: answers });
        // });
      });

  }

}
