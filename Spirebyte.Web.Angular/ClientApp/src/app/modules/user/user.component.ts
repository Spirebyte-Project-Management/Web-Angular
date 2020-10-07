import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../auth/_models/user.model';
import { AuthService } from '../auth/_services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user$: Observable<UserModel>;
  
  constructor(private auth: AuthService) {
    this.user$ = this.auth.currentUserSubject.pipe();
  }

  ngOnInit(): void {
  }

}
