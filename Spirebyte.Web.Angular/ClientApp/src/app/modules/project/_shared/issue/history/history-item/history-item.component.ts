import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/_models/user.model';
import { IssueHistoryModel, HistoryTypes } from 'src/app/modules/data/_models/issue-history.model';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss']
})
export class HistoryItemComponent implements OnInit {

  @Input() history: IssueHistoryModel;
  @Input() lastItem: boolean;

  user$: Observable<UserModel>;

  constructor(private userEntityService: UserEntityService) { }

  ngOnInit(): void {
    this.user$ = this.userEntityService.entities$.pipe(map(users => users.find(user => user.id == this.history.userId)));
  }

  getActionString(): string {
    switch(this.history.action){
      case HistoryTypes.Created: {
        return "Created an issue with the following fields:";
      }
      case HistoryTypes.Updated: {
        return (this.history.changedFields.length == 1) ? "Updated the" : "Updated the following fields:";
      }
    }
  }
}
