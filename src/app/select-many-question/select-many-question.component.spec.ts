import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectManyQuestionComponent } from './select-many-question.component';

describe('SelectManyQuestionComponent', () => {
  let component: SelectManyQuestionComponent;
  let fixture: ComponentFixture<SelectManyQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectManyQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectManyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
