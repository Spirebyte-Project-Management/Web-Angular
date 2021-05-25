import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDescriptionModalComponent } from './change-description-modal.component';

describe('ChangeDescriptionModalComponent', () => {
  let component: ChangeDescriptionModalComponent;
  let fixture: ComponentFixture<ChangeDescriptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDescriptionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
