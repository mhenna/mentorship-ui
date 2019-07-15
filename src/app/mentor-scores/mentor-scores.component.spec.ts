import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorScoresComponent } from './mentor-scores.component';

describe('MentorScoresComponent', () => {
  let component: MentorScoresComponent;
  let fixture: ComponentFixture<MentorScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
