import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectgroupModalComponent } from './create-projectgroup-modal.component';

describe('CreateProjectgroupModalComponent', () => {
  let component: CreateProjectgroupModalComponent;
  let fixture: ComponentFixture<CreateProjectgroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProjectgroupModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectgroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
