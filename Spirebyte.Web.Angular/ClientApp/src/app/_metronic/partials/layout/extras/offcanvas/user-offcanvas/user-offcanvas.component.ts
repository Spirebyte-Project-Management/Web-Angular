import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../../../modules/auth/_models/user.model';
import { AuthService } from '../../../../../../modules/auth/_services/auth.service';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})
export class UserOffcanvasComponent implements OnInit {
  extrasUserOffcanvasDirection = 'offcanvas-right';
  user$: Observable<UserModel>;

  @ViewChild('closeBtn') closeBtn: ElementRef<HTMLElement>;

  constructor(private layout: LayoutService, private auth: AuthService) {}

  ngOnInit(): void {
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
      'extras.user.offcanvas.direction'
    )}`;
    this.user$ = this.auth.currentUserSubject.asObservable();
  }

  close() {
      let el: HTMLElement = this.closeBtn.nativeElement;
      el.click();
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }
}
