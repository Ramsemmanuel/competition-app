import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJudgeProfileComponent } from './admin-judge-profile.component';

describe('AdminJudgeProfileComponent', () => {
  let component: AdminJudgeProfileComponent;
  let fixture: ComponentFixture<AdminJudgeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminJudgeProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminJudgeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
