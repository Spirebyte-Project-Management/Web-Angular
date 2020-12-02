import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { IssueModel, IssueStatus, IssueType } from '../../../_models/issue.model';
import { ProjectModel } from '../../../_models/project.model';
import { IssueHTTPService } from '../../../_services/issue-http.service';
import { UserHTTPService } from '../../../_services/user-http.service';

@Component({
  selector: 'app-issue-detail-aside',
  templateUrl: './issue-detail-aside.component.html',
  styleUrls: ['./issue-detail-aside.component.scss']
})
export class IssueDetailAsideComponent implements OnInit {

  @Input() issue: IssueModel;
  @Input() project: ProjectModel;
  issueType = IssueType;
  issueStatus = IssueStatus;

  private assignees: UserModel[] = [];
  private epics: IssueModel[] = [];

  constructor(private userHttpService: UserHTTPService, private issueHttpService: IssueHTTPService) {
  }

  ngOnInit(): void {
  }

  getAssignees(userIds: string[]): Observable<UserModel[]>{
    if (this.assignees.length > 0) {
      return of(this.assignees);
    }
    if (userIds.length === 0) {
      return this.userHttpService.getUsersWithIds(userIds).pipe(tap(res => this.assignees = res));
    }
  }

  getEpics(projectKey: string): Observable<IssueModel[]>{
    if (this.epics.length > 0) {
      return of(this.epics);
    }
    return this.issueHttpService.getEpicsForProject(projectKey).pipe(tap(res => this.epics = res));
  }
}
