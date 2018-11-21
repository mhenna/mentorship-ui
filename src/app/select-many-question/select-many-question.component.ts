import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-select-many-question',
  templateUrl: './select-many-question.component.html',
  styleUrls: ['./select-many-question.component.css']
})
export class SelectManyQuestionComponent implements OnInit {
  @Input() question:string;
  @Input() possibleAnswers:any[];
  @Input() questionId:any;
  @Input() numberOfChoises:any;  
  @Output() selectedAnswer= new EventEmitter<any>();
  private  possibleAnswerstemp:any[];
  
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  private optionSelected:any;
  constructor() {
    
   }

  ngOnInit() {
      this.selectedItems = [
     
    ];
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'answer_id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      limitSelection:this.numberOfChoises === 0?this.possibleAnswers.length: this.numberOfChoises,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {

    let response = {}    
      response = {"answer":this.selectedItems,"questionId":this.questionId}

    this.selectedAnswer.emit(response);
    
  }

  private itemHelper(){

  }
  onSelectAll(items: any) {
    let response = {"answer":items,"questionId":this.questionId}    
    this.selectedAnswer.emit(response);
  }
  onItemUnSelect(item: any) {
    let response = {}
      response = {"answer":this.selectedItems,"questionId":this.questionId}
    this.selectedAnswer.emit(response);
    
  }
  onUnSelectAll(items: any) {
    let response = {"answer":items,"questionId":this.questionId}    
    this.selectedAnswer.emit(response);
  }
  onOptionsSelected(answer:any){
     let response = {answer,"questionId":this.questionId}
    this.selectedAnswer.emit(response);

  }

}
