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
  loading = false;
  user: any = {};
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.route.queryParams
      .subscribe(async params => {
        this.user_id = params.id;
        this.loading = true;
        const response = await this.userService.getUser(this.user_id);
        this.user = response;
        this.loading = false;
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
