import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompetitionSearchComponent } from './admin-competition-search.component';

describe('AdminCompetitionSearchComponent', () => {
  let component: AdminCompetitionSearchComponent;
  let fixture: ComponentFixture<AdminCompetitionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompetitionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompetitionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
