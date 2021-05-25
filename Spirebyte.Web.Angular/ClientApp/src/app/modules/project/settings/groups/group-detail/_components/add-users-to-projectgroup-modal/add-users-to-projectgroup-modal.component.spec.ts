import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersToProjectgroupModalComponent } from './add-users-to-projectgroup-modal.component';

describe('AddUsersToProjectgroupModalComponent', () => {
  let component: AddUsersToProjectgroupModalComponent;
  let fixture: ComponentFixture<AddUsersToProjectgroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsersToProjectgroupModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersToProjectgroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
