import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachSignupComponent } from './coachsignup.component';

describe('CoachSignupComponent', () => {
  let component: CoachSignupComponent;
  let fixture: ComponentFixture<CoachSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
