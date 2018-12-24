import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminService } from '../../Services/admin.service'
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invite-mentor',
  templateUrl: './invite-mentor.component.html',
  styleUrls: ['./invite-mentor.component.css']
})
export class InviteMentorComponent implements OnInit {

  invitationErr: boolean;
  invitationSuccess: boolean;
  errMessage: string;
  active = false;
  inviteMentorForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
   
  });

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }



  invite() {
    this.hideAlerts();
    if (this.inviteMentorForm.valid) {
      this.adminService.iniviteMentor(this.inviteMentorForm.value.email).subscribe((res) => {
        this.invitationSuccess = true;
      }, (err) => {
        this.setErrorMessage(err.json()['body']);
      });
    }
  }
  hideAlerts() {
    this.invitationErr = false;
    this.invitationSuccess = false;
   
  }
  setErrorMessage(message: string) {
    this.invitationErr = true;
    this.errMessage = message;
  }
  modalOpen(){
    this.active = true;
   
  }

}
