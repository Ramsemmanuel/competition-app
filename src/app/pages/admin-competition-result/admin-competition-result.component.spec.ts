import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompetitionResultComponent } from './admin-competition-result.component';

describe('AdminCompetitionResultComponent', () => {
  let component: AdminCompetitionResultComponent;
  let fixture: ComponentFixture<AdminCompetitionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompetitionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompetitionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
