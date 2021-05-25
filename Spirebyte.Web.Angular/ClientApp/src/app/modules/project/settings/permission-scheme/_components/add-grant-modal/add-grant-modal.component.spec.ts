import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrantModalComponent } from './add-grant-modal.component';

describe('AddGrantModalComponent', () => {
  let component: AddGrantModalComponent;
  let fixture: ComponentFixture<AddGrantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGrantModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGrantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
