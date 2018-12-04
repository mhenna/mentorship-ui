import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NullInjector } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css']
})
export class CycleComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      startDate     : [ null ],
      endDate : [ null ],
      deadline    : [ null ],
      cycleName    : [null ],
     
    });
  }

}
