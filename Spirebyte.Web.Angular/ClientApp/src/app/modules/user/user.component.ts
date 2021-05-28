import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/_models/user.model';
import { getAuthenticatedUser } from 'src/app/_store/auth/auth.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user$: Observable<UserModel>;
  
  constructor(private store: Store) {
    this.user$ = this.store.select(getAuthenticatedUser);
  }

  ngOnInit(): void {
  }

}
