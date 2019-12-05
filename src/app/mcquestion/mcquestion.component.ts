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
  optionSelected:any;
  constructor() {
    
   }

  ngOnInit() {    
  }
  onOptionsSelected(answer:any){
    let response = {...answer,"questionId":this.questionId}
    this.selectedAnswer.emit(response);

  }

}
