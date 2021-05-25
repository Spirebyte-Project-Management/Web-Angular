import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionSchemeComponent } from './permission-scheme.component';

describe('PermissionSchemeComponent', () => {
  let component: PermissionSchemeComponent;
  let fixture: ComponentFixture<PermissionSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
