import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleMembersComponent } from './cycle-members.component';

describe('CycleMembersComponent', () => {
  let component: CycleMembersComponent;
  let fixture: ComponentFixture<CycleMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CycleMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CycleMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
