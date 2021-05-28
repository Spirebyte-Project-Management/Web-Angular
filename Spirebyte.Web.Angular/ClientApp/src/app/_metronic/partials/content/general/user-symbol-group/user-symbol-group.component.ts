import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/_models/user.model';

@Component({
  selector: 'app-user-symbol-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-symbol-group.component.html',
  styleUrls: ['./user-symbol-group.component.scss']
})
export class UserSymbolGroupComponent implements OnInit {

  @Input() pxlSize = 30;
  @Input() errorMessage = "";
  @Input() users$: Observable<UserModel[]>;

  constructor() { }

  ngOnInit(): void {
  }

  getClass(){
    return 'symbol-' + this.pxlSize;
  }

}
