import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveGrantModalComponent } from './remove-grant-modal.component';

describe('RemoveGrantModalComponent', () => {
  let component: RemoveGrantModalComponent;
  let fixture: ComponentFixture<RemoveGrantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveGrantModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveGrantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
