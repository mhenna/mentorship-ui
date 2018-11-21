import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.css']
})
export class TextQuestionComponent implements OnInit {

  @Input() question:string;
  @Input() questionId:any;
  @Output() selectedAnswer= new EventEmitter<any>();
  private optionSelected:any;
  constructor() {
    
   }

  ngOnInit() {   
  }
  onEnter(answer:any){
    let response = {"answer":[{"text":answer}],"questionId":this.questionId}
    this.selectedAnswer.emit(response);

  }

}
