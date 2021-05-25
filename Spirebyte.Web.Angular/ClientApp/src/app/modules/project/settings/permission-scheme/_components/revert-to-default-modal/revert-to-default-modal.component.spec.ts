import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevertToDefaultModalComponent } from './revert-to-default-modal.component';

describe('RevertToDefaultModalComponent', () => {
  let component: RevertToDefaultModalComponent;
  let fixture: ComponentFixture<RevertToDefaultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevertToDefaultModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevertToDefaultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
