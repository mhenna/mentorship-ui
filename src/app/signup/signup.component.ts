import { Component, OnInit,Input,Output } from '@angular/core';
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

  private question :string; 
  private possibleAnswers: any[];
  private selectedAnswer: any;

  validateForm: FormGroup;

  submitForm(): void {
    Object.keys(this.validateForm.controls).forEach(key => {
      this.validateForm.get(key).markAsDirty();
      this.validateForm.get(key).updateValueAndValidity();
    });
  }

  constructor(private fb: FormBuilder) {
    this.question = "hello";
    this.possibleAnswers = ["a","b","c","d"];
    // console.log("heeree",this.question,this.possibleAnswers)
  }

  ngOnInit(): void {
    console.log("heeree",this.selectedAnswer)
    setTimeout(this.submit, 1000);   
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]

    });
  }

  submit():void{
    console.log("heeree",this.selectedAnswer)   

  }
  selectAnswer(answer):void{
console.log("answer",answer);
  }

}
