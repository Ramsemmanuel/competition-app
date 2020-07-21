import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionApprovedComponent } from './submission-approved.component';

describe('SubmissionApprovedComponent', () => {
  let component: SubmissionApprovedComponent;
  let fixture: ComponentFixture<SubmissionApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
