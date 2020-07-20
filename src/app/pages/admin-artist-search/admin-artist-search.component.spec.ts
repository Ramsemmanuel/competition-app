import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArtistSearchComponent } from './admin-artist-search.component';

describe('AdminArtistSearchComponent', () => {
  let component: AdminArtistSearchComponent;
  let fixture: ComponentFixture<AdminArtistSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArtistSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArtistSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
