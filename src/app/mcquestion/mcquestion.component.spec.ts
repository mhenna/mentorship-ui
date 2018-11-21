import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McquestionComponent } from './mcquestion.component';

describe('McquestionComponent', () => {
  let component: McquestionComponent;
  let fixture: ComponentFixture<McquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
