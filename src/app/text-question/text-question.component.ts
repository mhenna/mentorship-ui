import { Component, OnInit ,Input,Output,EventEmitter, OnChanges} from '@angular/core';

@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.css']
})
export class TextQuestionComponent implements OnInit, OnChanges {

  @Input() question:string;
  @Input() questionId:any;
  @Output() selectedAnswer= new EventEmitter<any>();
  @Input() reset:boolean;
  private optionSelected:any;
  text:string = '';
  constructor() {
    
   }

  ngOnInit() {   
  }
  onEnter(answer:any){
    let response = {"answer":[answer],"questionId":this.questionId}
    this.selectedAnswer.emit(response);

  }
  ngOnChanges(changes) {
    for (let propName in changes) {
      if (propName === "reset"){
        if (this.reset === true){
         let response = {"answer":[''],"questionId":this.questionId};
         this.selectedAnswer.emit(response);
         this.text = '';
         setTimeout(()=>{
          this.reset = false;
         }, 2000)
        }
      }
   }
 }

}
