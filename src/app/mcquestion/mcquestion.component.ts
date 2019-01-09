import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-mcquestion',
  templateUrl: './mcquestion.component.html',
  styleUrls: ['./mcquestion.component.css']
})
export class McquestionComponent implements OnInit {
  @Input() question:string;
  @Input() possibleAnswers:any[];
  @Input() questionId:any;
  @Output() selectedAnswer= new EventEmitter<any>();
  private optionSelected:any;
  constructor() {
    
   }

  ngOnInit() {
    console.log(this.question);
    console.log(this.possibleAnswers, "KKKKKKKKKKKKK");
    console.log(this.questionId);
    
    
  }
  onOptionsSelected(answer:any){
    let response = {...answer,"questionId":this.questionId}
    this.selectedAnswer.emit(response);

  }

}
