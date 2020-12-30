import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSymbolGroupComponent } from './user-symbol-group.component';

describe('PeopleSymbolGroupComponent', () => {
  let component: UserSymbolGroupComponent;
  let fixture: ComponentFixture<UserSymbolGroupComponent>;

  beforeEach(async(() => {
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
