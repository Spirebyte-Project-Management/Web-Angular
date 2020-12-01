import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { IssueModel, IssueStatus, IssueType } from '../../../_models/issue.model';
import { ProjectModel } from '../../../_models/project.model';
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

  private assignees: UserModel[];

  constructor(private userHttpService: UserHTTPService) { }

  ngOnInit(): void {
  }

  getAssignees(userIds: string[]): Observable<UserModel[]>{
    if (this.assignees.length > 0) {
      return of(this.assignees);
    }
    if (this.issue.assignees.length === 0) {
      return this.userHttpService.getUsersWithIds(this.issue.assignees).pipe(tap(res => this.assignees = res));
    }
  }

}
