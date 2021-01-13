import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubIssueComponent } from './sub-issue.component';

describe('SubIssueComponent', () => {
  let component: SubIssueComponent;
  let fixture: ComponentFixture<SubIssueComponent>;

  beforeEach(async(() => {
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
