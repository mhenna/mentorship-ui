import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchUsersComponent } from './match-users.component';

describe('MatchUsersComponent', () => {
  let component: MatchUsersComponent;
  let fixture: ComponentFixture<MatchUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
