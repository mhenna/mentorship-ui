import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-match-users',
  templateUrl: './match-users.component.html',
  styleUrls: ['./match-users.component.css']
})
export class MatchUsersComponent implements OnInit {
  users :any[];
  mentors:any[]=[];
  mentees:any[]=[];
  selectedMentor:any;
  selectedMentee:any;
  matchings :any[]=[];
  constructor(private userService: UserService) { }
  async ngOnInit() {
    try {
     
      this.users = await this.userService.getUsers();
      for(let i =0;i<this.users.length;i++){
            
        if(this.users[i].is_mentor )

        this.mentors.push(this.users[i])
    
        else
          if(!this.users[i].is_mentor && this.users[i].matched.length==0){
          this.mentees.push(this.users[i])
       
      }
     
      
    }
    for(let i = 0 ; i<this.mentors.length;i++){
      
      for(let j = 0 ; j <this.mentors[i].matched.length;j++){        
        this.matchings.push({"mentorId":this.mentors[i].user_id,"mentorEmail":this.mentors[i].email,"menteeId":this.mentors[i].matched[j].user_id,"menteeEmail":this.mentors[i].matched[j].email})
      }
    }    
  } catch (error) {
    }
    
  }
  changeMentor(mentor){
this.selectedMentor=mentor

  }
  changeMentee(mentee){
  this.selectedMentee = mentee

  }
  match(){    
    this.userService.matchUsers(this.selectedMentee.user_id,this.selectedMentor.user_id)
  }
  unmatch(mentorId,menteeId){
    this.userService.unMatchUsers(menteeId,mentorId)


  }
  

  
 
}
