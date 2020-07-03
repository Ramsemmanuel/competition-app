import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionReviewCompletedComponent } from './submission-review-completed.component';

describe('SubmissionReviewCompletedComponent', () => {
  let component: SubmissionReviewCompletedComponent;
  let fixture: ComponentFixture<SubmissionReviewCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionReviewCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionReviewCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
