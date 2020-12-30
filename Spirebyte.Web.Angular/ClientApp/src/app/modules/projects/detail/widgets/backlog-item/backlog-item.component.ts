import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { IssueModel, IssueType } from '../../../_models/issue.model';
import { IssueEntityService } from '../../../_services/issues/issue-entity.service';
import { UserEntityService } from '../../../_services/users/user-entity.service';

@Component({
  selector: 'app-backlog-item',
  templateUrl: './backlog-item.component.html',
  styleUrls: ['./backlog-item.component.scss']
})
export class BacklogItemComponent implements OnInit {

  issueType = IssueType;

  assignees$: Observable<UserModel[]>;

  @Input() issue: IssueModel;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userEntityService: UserEntityService) { }

  ngOnInit(): void {
    this.assignees$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => this.issue.assignees.includes(user.id))));
  }

  setSelectedIssue(key: string): void {
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        selectedIssue: key
      }
    });
  }
}
