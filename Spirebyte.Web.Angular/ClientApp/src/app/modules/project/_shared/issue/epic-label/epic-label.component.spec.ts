import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EpicLabelComponent } from './epic-label.component';

describe('EpicLabelComponent', () => {
  let component: EpicLabelComponent;
  let fixture: ComponentFixture<EpicLabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EpicLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
