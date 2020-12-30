import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicLabelComponent } from './epic-label.component';

describe('EpicLabelComponent', () => {
  let component: EpicLabelComponent;
  let fixture: ComponentFixture<EpicLabelComponent>;

  beforeEach(async(() => {
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
