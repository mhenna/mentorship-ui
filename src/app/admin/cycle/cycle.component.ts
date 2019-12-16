import { Component, OnInit, } from '@angular/core';
import { Dates } from 'date-format'
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { NullInjector } from '@angular/core/src/di/injector';
import { AdminService } from '../../Services/admin.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css']
})
export class CycleComponent implements OnInit {

  validateForm: FormGroup;
  dateFormat = 'yyyy-MM-dd HH:mm:ss';
  cycles = [];
  open = false;
  deadlines: any
  startDate: any
  selectedId: any;
  skills: any
  cyclesFetched = false;
  current = false;
  currentCycleId: any;
  error: any;
  today = new Date();

  editForm = new FormGroup({

    name: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),


  });
  deadlineForm = new FormGroup({
    mentorDate: new FormControl('', [Validators.required]),
    menteeDate: new FormControl('', [Validators.required]),
    cycleName: new FormControl('', [Validators.required]),
  });

  StartDateForm = new FormGroup({
    mentorDate: new FormControl('', [Validators.required]),
    menteeDate: new FormControl('', [Validators.required]),
    cycleName: new FormControl('', [Validators.required]),
  });

  skillsForm = new FormGroup({
    skillName: new FormControl('', [Validators.required]),
    skillType: new FormControl('', [Validators.required])
  })

  constructor(private fb: FormBuilder,
    private adminService: AdminService) {
    this.error = false;
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      startDate: Dates,
      endDate: Dates,
      cycleName: [null],

    });

    this.getCycles();
    this.adminService.getSkills().subscribe(res => {

      this.skills = res;
    })

    this.adminService.getDeadlines().subscribe(res => {
      this.deadlines = res
      if(!(!Array.isArray(res) || !res.length))
        this.setDeadlines(this.deadlines)
    }

    )


  }
  editDeadline() {

    const chosenCycle = this.deadlineForm.get('cycleName').value
    const ind = this.cycles.findIndex(function (item, i) {
      return item.name === chosenCycle
    })
    const mentorDeadline = new Date(this.deadlineForm.value.mentorDate)
    const menteeDeadline = new Date(this.deadlineForm.value.menteeDate)
    this.adminService.editDeadlines(mentorDeadline.toISOString(), menteeDeadline.toISOString(),
      this.cycles[ind]).subscribe(res => {
        alert('Date updated')
      }, (err) => {
        alert(err)
      })
  }
  editStartDate() {

    const chosenCycle = this.StartDateForm.get('cycleName').value
    const ind = this.cycles.findIndex(function (item, i) {
      return item.name === chosenCycle
    })

    const mentorStartDate = new Date(this.StartDateForm.value.mentorDate)
    const menteeStartDate = new Date(this.StartDateForm.value.menteeDate)
    this.adminService.editStartDate(mentorStartDate.toISOString(), menteeStartDate.toISOString(),
      this.cycles[ind]).subscribe(res => {
        alert('Date updated')
      }, (err) => {
        alert(err)
      })
  }
  addSkill(skillId, cycleId) {
    this.cyclesFetched = false;
    this.adminService.addSkilltoCycle(skillId, cycleId).subscribe(async (res) => {

      await this.getCycles();

    }, (err) => {
      alert(err)
      this.getCycles();

    });
  }
  newCycle() {
    this.cyclesFetched = false;
    this.adminService.addCycle(this.validateForm.value.startDate.toISOString(), this.validateForm.value.endDate.toISOString(), this.validateForm.value.cycleName).subscribe(async (res) => {
      await this.getCycles();
    }, (err) => {
    });

  }
  editCycle() {
    this.cyclesFetched = false;
    if (typeof (this.editForm.value.startDate) == 'object' && typeof (this.editForm.value.endDate) == 'object') {
      this.adminService.editCycle(this.selectedId, this.editForm.value.startDate.toISOString(), this.editForm.value.endDate.toISOString(), this.editForm.value.name).subscribe(async (res) => {
        this.open = false;
        await this.getCycles();
        this.open = false;

      }, (err) => {
        alert(err)
      });
    }

    else if (typeof (this.editForm.value.startDate) == 'object') {
      this.adminService.editCycle(this.selectedId, this.editForm.value.startDate.toISOString(), this.editForm.value.endDate, this.editForm.value.name).subscribe(async (res) => {
        this.open = false;
        await this.getCycles();
        this.open = false;

      }, (err) => {
        alert(err)
      });
    }

    else if (typeof (this.editForm.value.endDate) == 'object') {
      this.adminService.editCycle(this.selectedId, this.editForm.value.startDate, this.editForm.value.endDate.toISOString(), this.editForm.value.name).subscribe(async (res) => {
        this.open = false;
        await this.getCycles();
        this.open = false;

      }, (err) => {
        alert(err)
      });
    }

    else {
      this.adminService.editCycle(this.selectedId, this.editForm.value.startDate, this.editForm.value.endDate, this.editForm.value.name).subscribe(async (res) => {
        this.open = false;
        await this.getCycles();
        this.open = false;

      }, (err) => {
        alert(err)
      });
    }

  }

  getCycles() {
    this.adminService.getCycles().subscribe(async (res) => {

      this.cycles = await res
      this.cyclesFetched = true;

      var now = new Date()

      var i;

      for (i = 0; i < this.cycles.length; i++) {

        if (now >= new Date(this.cycles[i].start_date) && now <= new Date(this.cycles[i].end_date)) {
          this.current = true;
          this.currentCycleId = this.cycles[i].id
        }
      }
    }, (err) => {

    });
  }

  deleteCycle(id) {
    this.cyclesFetched = false;
    this.adminService.deleteCycle(id).subscribe(async (res) => {
      await this.getCycles();

      if (id === this.currentCycleId) {
        this.currentCycleId = -1
        this.current = false
      }

    }, (err) => {
      alert(err)
    });

  }


  selectedCycle(cycle) {

    this.editForm.setValue({ name: cycle.name, startDate: cycle.start_date, endDate: cycle.end_date })
    this.open = true;
    this.selectedId = cycle.id
  }

  setDeadlines(deadline) {
    this.deadlineForm.setValue({ mentorDate: deadline[0].mentor_DeadlineRegistration, menteeDate: deadline[0].mentee_DeadlineRegistration, cycleName: '' })
  }

  newSkill() {
    if (this.skillsForm.value.skillName && this.skillsForm.value.skillType) {
      this.error = false;
      this.adminService.addSkill(this.skillsForm.value.skillName, this.skillsForm.value.skillType).subscribe(async (res) => {
        this.adminService.getSkills().subscribe(res => {
          this.skills = res;
        })

        this.skillsForm.reset()
        alert('Skill added')
      }, (err) => {

      });
    }

    else {
      this.error = true;
    }
  }


  Submit() {
    console.log("Submit() called but the function does not exist, this log was entered to detect when the function gets called")
  }

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };
}
