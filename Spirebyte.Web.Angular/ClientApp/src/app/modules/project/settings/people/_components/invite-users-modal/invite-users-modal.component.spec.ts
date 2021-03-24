import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteUsersModalComponent } from './invite-users-modal.component';

describe('InviteUsersModalComponent', () => {
  let component: InviteUsersModalComponent;
  let fixture: ComponentFixture<InviteUsersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteUsersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteUsersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
