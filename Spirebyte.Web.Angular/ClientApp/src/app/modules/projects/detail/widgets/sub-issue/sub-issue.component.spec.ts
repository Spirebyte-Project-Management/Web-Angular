import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubIssueComponent } from './sub-issue.component';

describe('SubIssueComponent', () => {
  let component: SubIssueComponent;
  let fixture: ComponentFixture<SubIssueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
