import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserSymbolGroupComponent } from './user-symbol-group.component';

describe('PeopleSymbolGroupComponent', () => {
  let component: UserSymbolGroupComponent;
  let fixture: ComponentFixture<UserSymbolGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSymbolGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSymbolGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
