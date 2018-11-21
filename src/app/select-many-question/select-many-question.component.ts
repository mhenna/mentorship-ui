import { Component, OnInit ,Input,Output,EventEmitter, OnChanges} from '@angular/core';

@Component({
  selector: 'app-select-many-question',
  templateUrl: './select-many-question.component.html',
  styleUrls: ['./select-many-question.component.css']
})
export class SelectManyQuestionComponent implements OnInit, OnChanges {
  @Input() question:string;
  @Input() possibleAnswers:any[];
  @Input() questionId:any;
  @Input() numberOfChoises:any; 
  @Input() reset:boolean; 
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
  ngOnChanges(changes) {
    // tslint:disable-next-line:forin
    for (let propName in changes) {
      console.log("CHANGES", changes);
      if (propName === "reset"){
        console.log("RESET");
        
        if (this.reset === true){
          console.log("RESET TRUE", this.reset);

         let response = {"answer":[],"questionId":this.questionId};
         this.selectedAnswer.emit(response);
         this.selectedItems = [];
         setTimeout(()=>{
          this.reset = false;
         }, 2000)
        }
      }
   }
 }
}
