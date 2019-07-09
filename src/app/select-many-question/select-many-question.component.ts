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
  @Input() isMentee:any;
  @Output() selectedAnswer= new EventEmitter<any>();
  @Output() deletedAnswer= new EventEmitter<any>();
  @Output() deselectAll= new EventEmitter<any>();
  private  possibleAnswerstemp:any[];
  
  dropdownList = [];
  selectedItems = [];
  answers=[];
  dropdownSettings = {};
  IsCareerMentoring = false; 
  careerMentoringValue = "Career mentoring";
  private optionSelected:any;
  constructor() {
    
   }

  ngOnInit() {
      this.selectedItems = [

    ];
    console.log(this.possibleAnswers,"POSSIBLE")
    for (let j = 0; j<this.possibleAnswers[0].text.length; j++){
      console.log(this.possibleAnswers[0].text[j],"POSSIBLE")
      this.answers.push({id: j, item: this.possibleAnswers[0].text[j]})
      
    }
  console.log(this.answers.length,"SIZE", this.answers)
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'item',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      limitSelection:this.numberOfChoises === 0?this.answers.length: this.numberOfChoises,
      allowSearchFilter: true
    };

   
  }
  onItemSelect(item: any) {
    console.log(item.id,item.item, "ITEMSelect")
    let response = {item:item.item, "questionId":this.questionId}
    
    console.log("isMentee value:", this.isMentee == 0)
    if (this.isMentee == 0){
      if (!this.IsCareerMentoring){

        // This is to remove selected answers
        if (item.item == this.careerMentoringValue){
          this.onUnSelectAll(item)
          this.IsCareerMentoring = true
        }
        
      }else{
        this.onUnSelectAll(item)
        this.IsCareerMentoring = false
      }
    }
    this.selectedAnswer.emit(response); 
  }

  private itemHelper(){

  }
  onSelectAll(items: any) {
    console.log(items,"ITEMSAll")
    let response = {"answer":items,"questionId":this.questionId}    
    this.selectedAnswer.emit(response);
  }
  onItemUnSelect(item: any) {
    if (item.item == this.careerMentoringValue){
      this.IsCareerMentoring = false;
    }
    let answer=[]
    for (let i=0;i<this.selectedItems.length;i++){
      answer[i]=this.selectedItems[i].item
    }
    let response = {}
    console.log(answer,"deleted")
    response = {"answer":answer,"questionId":this.questionId}
    this.deletedAnswer.emit(response);
    
  }
  onUnSelectAll(item: any) {
    console.log("onUnselectall()")
    this.selectedItems = [item]
    let response = {"answer":[],"questionId":this.questionId}    
    this.deselectAll.emit(response);
  }
  onOptionsSelected(answer:any){
    console.log(answer,"MULTI")
     let response = {answer,"questionId":this.questionId}
    this.selectedAnswer.emit(response);

  }
  ngOnChanges(changes) {

    // tslint:disable-next-line:forin
    for (let propName in changes) {
      
      if (propName === "reset"){
        
        
        if (this.reset === true){
          console.log("RESET TRUE", this.reset);

         let response = {"answer":[],"questionId":this.questionId};
         this.deletedAnswer.emit(response);
         this.selectedItems = [];
         setTimeout(()=>{
          this.reset = false;
         }, 2000)
        }
      }
   }
 }
}
