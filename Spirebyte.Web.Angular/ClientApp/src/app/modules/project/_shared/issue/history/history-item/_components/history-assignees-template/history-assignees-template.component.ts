import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';
import { UserModel } from 'src/app/_models/user.model';

@Component({
  selector: 'app-history-assignees-template',
  templateUrl: './history-assignees-template.component.html',
  styleUrls: ['./history-assignees-template.component.scss']
})
export class HistoryAssigneesTemplateComponent {

  @Input() value: string[];
  users$: Observable<UserModel[]>;

  constructor(private userEntityService: UserEntityService) {
    this.users$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => this.value.includes(user.id))));
  }

}
