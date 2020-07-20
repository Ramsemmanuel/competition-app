import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArtistProfileComponent } from './admin-artist-profile.component';

describe('AdminArtistProfileComponent', () => {
  let component: AdminArtistProfileComponent;
  let fixture: ComponentFixture<AdminArtistProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArtistProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArtistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
