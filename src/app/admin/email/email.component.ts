import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

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
  flag=false;
  users : any;
  listOfSelectedValue = [];
  count : any;

  emailForm = new FormGroup({
    
    email: new FormControl(''),
   
   
  });

  constructor(private adminService: AdminService,
    private userService : UserService) { }

  ngOnInit() {
    this.count = 0;
    this.getUsers();
  }


modalOpen(){
  this.active = true;
  console.log(this.active)
}

  sendEmail(){
    
    this.count = this.count + 1;

    if (this.count == 1)
      this.emailForm.value.email.shift()

    console.log(this.emailForm.value.email, " AFTER kjwfkjweifhwei")
    // console.log(this.inputValue,"||||||", this.emailForm.value.email)
    this.adminService.sendEmail(this.type,this.emailForm.value.email,this.inputValue).subscribe(async (res) => {

      this.active = false ;
      
      console.log("email sent")
    }, (err) => {
      
    });

    this.emailForm.reset()
  }

  log(x){

    this.type = x;
    if(this.type=="seperate"){
      this.flag= true;
    }else{
      this.flag= false;
    }

  }

  async getUsers() {
    this.users = await this.userService.getUsers();
  }
}
