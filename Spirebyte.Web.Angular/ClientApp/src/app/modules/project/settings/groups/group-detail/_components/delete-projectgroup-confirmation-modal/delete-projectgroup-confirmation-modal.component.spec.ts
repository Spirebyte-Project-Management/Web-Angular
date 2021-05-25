import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProjectgroupConfirmationModalComponent } from './delete-projectgroup-confirmation-modal.component';

describe('DeleteProjectgroupConfirmationModalComponent', () => {
  let component: DeleteProjectgroupConfirmationModalComponent;
  let fixture: ComponentFixture<DeleteProjectgroupConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProjectgroupConfirmationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProjectgroupConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
