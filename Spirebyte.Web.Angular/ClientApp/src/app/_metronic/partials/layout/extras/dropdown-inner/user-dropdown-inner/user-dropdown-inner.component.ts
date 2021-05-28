import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../../core';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/_models/user.model';
import { getAuthenticatedUser } from 'src/app/_store/auth/auth.selectors';

import * as AuthActions from '../../../../../../_store/auth/auth.actions';

@Component({
  selector: 'app-user-dropdown-inner',
  templateUrl: './user-dropdown-inner.component.html',
  styleUrls: ['./user-dropdown-inner.component.scss'],
})
export class UserDropdownInnerComponent implements OnInit {
  extrasUserDropdownStyle: 'light' | 'dark' = 'light';
  user$: Observable<UserModel>;

  constructor(private layout: LayoutService, private store: Store) {}

  ngOnInit(): void {
    this.extrasUserDropdownStyle = this.layout.getProp(
      'extras.user.dropdown.style'
    );
    this.user$ = this.store.select(getAuthenticatedUser);
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
