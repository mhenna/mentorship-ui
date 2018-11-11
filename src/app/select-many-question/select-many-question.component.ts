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
  @Output() selectedAnswer= new EventEmitter<any>();
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
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
    let response = {"answer":this.selectedItems,"questionId":this.questionId}    
    this.selectedAnswer.emit(response);
    
  }
  onSelectAll(items: any) {
    console.log(items);
    let response = {"answer":items,"questionId":this.questionId}    
    this.selectedAnswer.emit(response);
  }
  onItemUnSelect(item: any) {
    console.log(item);
    let response = {"answer":this.selectedItems,"questionId":this.questionId}    
    this.selectedAnswer.emit(response);
    
  }
  onUnSelectAll(items: any) {
    console.log(items);
    let response = {"answer":items,"questionId":this.questionId}    
    this.selectedAnswer.emit(response);
  }
  onOptionsSelected(answer:any){
    console.log("kghj",answer.constructor.name)
    let response = {answer,"questionId":this.questionId}
    this.selectedAnswer.emit(response);

  }

}
