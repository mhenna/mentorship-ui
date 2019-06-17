import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteMentorComponent } from './invite-mentor.component';

describe('InviteMentorComponent', () => {
  let component: InviteMentorComponent;
  let fixture: ComponentFixture<InviteMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
