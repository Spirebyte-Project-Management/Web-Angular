import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTagInputComponent } from './users-tag-input.component';

describe('UsersTagInputComponent', () => {
  let component: UsersTagInputComponent;
  let fixture: ComponentFixture<UsersTagInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTagInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTagInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
