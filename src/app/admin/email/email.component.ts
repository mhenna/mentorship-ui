import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  @Output() questionAdded: EventEmitter<any> = new EventEmitter<any>();

  type: any;
  body: any;
  email: any;
  inputValue : string
  active= false;

  emailForm = new FormGroup({
    
    email: new FormControl(''),
   
   
  });

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }


modalOpen(){
  this.active = true;
  console.log(this.active)
}

  sendEmail(){
    

    // console.log(this.inputValue,"||||||", this.emailForm.value.email)
    this.adminService.sendEmail(this.type,this.emailForm.value.email,this.inputValue).subscribe(async (res) => {

      this.active = false ;
      
      console.log("email sent")
 
    }, (err) => {
      
    });

  }

  log(x){

    this.type = x;

  }
}
