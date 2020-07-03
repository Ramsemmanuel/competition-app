import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionCompletedDialogComponent } from './submission-completed-dialog.component';

describe('SubmissionCompletedDialogComponent', () => {
  let component: SubmissionCompletedDialogComponent;
  let fixture: ComponentFixture<SubmissionCompletedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionCompletedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionCompletedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
