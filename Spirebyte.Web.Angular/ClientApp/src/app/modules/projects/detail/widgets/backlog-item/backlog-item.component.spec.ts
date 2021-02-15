import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BacklogItemComponent } from './backlog-item.component';

describe('BacklogItemComponent', () => {
  let component: BacklogItemComponent;
  let fixture: ComponentFixture<BacklogItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
