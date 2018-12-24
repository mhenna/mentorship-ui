import { Component, OnInit, } from '@angular/core';
import {Date} from 'date-format'
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { NullInjector } from '@angular/core/src/di/injector';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css']
})
export class CycleComponent implements OnInit {

  validateForm: FormGroup;
  dateFormat = 'yyyy-MM-dd HH:mm:ss';
  cycles = [];
  open= false;
 deadlines: any
  selectedId: any;
  skills: any
  
 
 

  editForm = new FormGroup({
    
    name: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    

  });
  deadlineForm = new FormGroup({      
    mentorDate: new FormControl('', [Validators.required]),
    menteeDate: new FormControl('', [Validators.required]),    

  });

  constructor(private fb: FormBuilder,
  private adminService: AdminService ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      startDate     : Date,
      endDate : Date,
      cycleName    : [null ],
     
    });
    this.getCycles();
    this.adminService.getSkills().subscribe(res=>{

      this.skills=res;
      console.log(this.skills,res)
    
    
    })

    this.adminService.getDeadlines().subscribe(res=>{
      this.deadlines=res
      console.log(this.deadlines)
      this.setDeadlines(this.deadlines)
    }
    
    )
      
    
  }
editDeadline(){

  this.adminService.editDeadlines(this.deadlineForm.value.mentorDate,this.deadlineForm.value.menteeDate,this.deadlines.id).subscribe(res=>{
    console.log("deadline changed")
  })
}
  addSkill(skillId, cycleId){
    this.adminService.addSkilltoCycle(skillId,cycleId).subscribe(async (res) => {
      
      console.log("Skill added")
       await this.getCycles();
     
     
    }, (err) => {

      console.log("ERR")
    
    });
  }
  newCycle(){
    this.adminService.addCycle(this.validateForm.value.startDate.toISOString(),this.validateForm.value.endDate.toISOString(),this.validateForm.value.deadline.toISOString(),this.validateForm.value.cycleName).subscribe(async (res) => {

      console.log("cycle added")
       await this.getCycles();
     
    }, (err) => {

      console.log("ERR")
    
    });
 
  }
  editCycle(){
    this.adminService.editCycle(this.selectedId,this.editForm.value.startDate,this.editForm.value.endDate,this.editForm.value.name).subscribe(async (res) => {
      this.open =false;
      console.log("cycle added")
       await this.getCycles();
       this.open =false;
     
    }, (err) => {

      console.log("ERR")
    
    });
 
  }

  getCycles(){
    this.adminService.getCycles().subscribe(async (res) => {

       this.cycles =  await res
      
      

    }, (err) => {
      
    });
  }
  deleteCycle(id){
    console.log("DELETE")
    this.adminService.deleteCycle(id).subscribe(async (res) => {
      console.log("DELETE")
     await this.getCycles();
     
    

   }, (err) => {
     
   });

  }

  
selectedCycle(cycle){

  // this.selectedEmp= employee;
  this.editForm.setValue({name:cycle.name, startDate: cycle.start_date, endDate: cycle.end_date })
  this.open = true;
  this.selectedId=cycle.id
  
  }

  setDeadlines(deadline){

    console.log(deadline,"HEERREE!!!!",deadline.mentor_registration,deadline.mentee_registration)
    // this.selectedEmp= employee;
    this.deadlineForm.setValue({mentorDate: deadline[0].mentor_registration, menteeDate: deadline[0].mentee_registration })
    
    console.log(this.deadlineForm.value)
    }


 


 


    
  

}
