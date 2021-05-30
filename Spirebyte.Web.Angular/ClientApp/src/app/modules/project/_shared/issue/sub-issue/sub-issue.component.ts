import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/_models/user.model';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';
import { IssueType, IssueModel } from '../../../issue-tracking/_models/issue.model';

@Component({
  selector: 'app-sub-issue',
  templateUrl: './sub-issue.component.html',
  styleUrls: ['./sub-issue.component.scss']
})
export class SubIssueComponent implements OnInit {

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
