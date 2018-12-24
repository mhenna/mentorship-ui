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
  
  selectedId: any;
 

  editForm = new FormGroup({
    
    name: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    deadline: new FormControl(''),

  });

  constructor(private fb: FormBuilder,
  private adminService: AdminService ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      startDate     : Date,
      endDate : Date,
      deadline    : Date,
      cycleName    : [null ],
     
    });
    this.getCycles();
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
    this.adminService.editCycle(this.selectedId,this.editForm.value.startDate,this.editForm.value.endDate,this.editForm.value.deadline,this.editForm.value.name).subscribe(async (res) => {
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
      
      console.log(this.cycles)

    }, (err) => {
      
    });
  }
  deleteCycle(id){
    this.adminService.deleteCycle(id).subscribe(async (res) => {

     await this.getCycles();
     
     console.log(this.cycles)

   }, (err) => {
     
   });

  }

  
selectedCycle(cycle){

  // this.selectedEmp= employee;
  this.editForm.setValue({name:cycle.name, startDate: cycle.start_date, endDate: cycle.end_date, deadline: cycle.deadline })
  this.open = true;
  this.selectedId=cycle.id
  
  }


 


    
  

}
