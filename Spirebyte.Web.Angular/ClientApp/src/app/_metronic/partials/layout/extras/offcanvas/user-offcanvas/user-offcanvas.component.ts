import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAuthenticatedUser, getAuthenticatedUserId } from 'src/app/_store/auth/auth.selectors';
import { UserModel } from 'src/app/_models/user.model';

import * as AuthActions from '../../../../../../_store/auth/auth.actions';
import { AuthEffects } from 'src/app/_store/auth/auth.effects';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})
export class UserOffcanvasComponent implements OnInit {
  extrasUserOffcanvasDirection = 'offcanvas-right';
  user$: Observable<UserModel>;

  @ViewChild('closeBtn') closeBtn: ElementRef<HTMLElement>;

  constructor(private layout: LayoutService, private store: Store) {}

  ngOnInit(): void {
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
      'extras.user.offcanvas.direction'
    )}`;
    this.user$ = this.store.select(getAuthenticatedUser);
  }

  close() {
      let el: HTMLElement = this.closeBtn.nativeElement;
      el.click();
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
