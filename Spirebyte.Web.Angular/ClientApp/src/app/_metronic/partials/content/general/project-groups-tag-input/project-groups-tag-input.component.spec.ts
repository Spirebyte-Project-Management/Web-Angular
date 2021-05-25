import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGroupsTagInputComponent } from './project-groups-tag-input.component';

describe('ProjectGroupsTagInputComponent', () => {
  let component: ProjectGroupsTagInputComponent;
  let fixture: ComponentFixture<ProjectGroupsTagInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectGroupsTagInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGroupsTagInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
