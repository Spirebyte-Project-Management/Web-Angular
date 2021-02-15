import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AuthComponent} from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <h3> with text </h3>', () => {
    const authComponent: HTMLElement = fixture.nativeElement;
    const h3 = authComponent.querySelector('h3');
    expect(h3.textContent).toMatch(/Discover Spirebyte and start documenting your projects/i);
  });
});
