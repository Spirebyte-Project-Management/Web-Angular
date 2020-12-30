import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import stc from 'string-to-color';
import { UserModel } from '../../../../auth/_models/user.model';
import { IssueModel, IssueStatus, IssueType } from '../../../_models/issue.model';
import { ProjectModel } from '../../../_models/project.model';
import { IssueEntityService } from '../../../_services/issues/issue-entity.service';
import { IssueHTTPService } from '../../../_services/issues/issue-http.service';
import { UserEntityService } from '../../../_services/users/user-entity.service';
import { UserHTTPService } from '../../../_services/users/user-http.service';

@Component({
  selector: 'app-issue-detail-aside',
  templateUrl: './issue-detail-aside.component.html',
  styleUrls: ['./issue-detail-aside.component.scss']
})
export class IssueDetailAsideComponent implements OnInit, OnChanges {

  @Input() issue: IssueModel;
  @Input() project: ProjectModel;
  issueType = IssueType;
  issueStatus = IssueStatus;

  epics$: Observable<IssueModel[]>;
  assignees$: Observable<UserModel[]>;

  constructor(private userEntityService: UserEntityService, private issueEntityService: IssueEntityService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.assignees$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => this.issue.assignees.includes(user.id))));
  }

  ngOnInit(): void {
    this.epics$ = this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.type == IssueType.Epic)));
    this.assignees$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => this.issue.assignees.includes(user.id))));
  }

  public epicColor(epicKey: string): string {
    return epicKey != null ? stc(epicKey) : '#ffffff';
  }
}
