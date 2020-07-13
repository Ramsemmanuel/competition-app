import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJudgeSearchComponent } from './admin-judge-search.component';

describe('AdminJudgeSearchComponent', () => {
  let component: AdminJudgeSearchComponent;
  let fixture: ComponentFixture<AdminJudgeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminJudgeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminJudgeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
