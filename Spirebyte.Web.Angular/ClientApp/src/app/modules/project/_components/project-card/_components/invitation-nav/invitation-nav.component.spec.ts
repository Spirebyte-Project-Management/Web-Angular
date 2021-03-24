import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationNavComponent } from './invitation-nav.component';

describe('InvitationNavComponent', () => {
  let component: InvitationNavComponent;
  let fixture: ComponentFixture<InvitationNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
