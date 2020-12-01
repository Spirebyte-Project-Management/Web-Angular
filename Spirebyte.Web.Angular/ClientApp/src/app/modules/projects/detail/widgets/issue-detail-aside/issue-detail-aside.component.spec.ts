import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueDetailAsideComponent } from './issue-detail-aside.component';

describe('IssueDetailAsideComponent', () => {
  let component: IssueDetailAsideComponent;
  let fixture: ComponentFixture<IssueDetailAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueDetailAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDetailAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
