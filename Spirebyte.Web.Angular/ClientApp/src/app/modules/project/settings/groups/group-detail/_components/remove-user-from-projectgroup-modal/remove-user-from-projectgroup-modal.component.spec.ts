import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveUserFromProjectgroupModalComponent } from './remove-user-from-projectgroup-modal.component';

describe('RemoveUserFromProjectgroupModalComponent', () => {
  let component: RemoveUserFromProjectgroupModalComponent;
  let fixture: ComponentFixture<RemoveUserFromProjectgroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveUserFromProjectgroupModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveUserFromProjectgroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
