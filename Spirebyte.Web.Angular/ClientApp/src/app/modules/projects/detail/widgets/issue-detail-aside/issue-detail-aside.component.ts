import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import * as InlineEditor from 'ckeditor5-build-inline-with-base64-image-upload';

@Component({
  selector: 'app-issue-detail-aside',
  templateUrl: './issue-detail-aside.component.html',
  styleUrls: ['./issue-detail-aside.component.scss']
})
export class IssueDetailAsideComponent implements OnInit, OnChanges {
  Editor = InlineEditor;

  types = IssueType;
  statusus = IssueStatus;
  updateIssueForm: FormGroup;

  @Input() issue: IssueModel;
  @Input() project: ProjectModel;
  issueType = IssueType;
  issueStatus = IssueStatus;

  localIssue: IssueModel;

  epics$: Observable<IssueModel[]>;
  assignees$: Observable<UserModel[]>;

  epicSubIssues$: Observable<IssueModel[]>;

  constructor(private userEntityService: UserEntityService, private issueEntityService: IssueEntityService, private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.localIssue = new IssueModel();
    this.localIssue.setIssue(this.issue);
    this.assignees$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => this.issue.assignees.includes(user.id))));
    this.epicSubIssues$ = this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.epicId == this.issue.id)));
  }

  ngOnInit(): void {
    this.epics$ = this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.type == IssueType.Epic)));
    this.assignees$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => this.issue.assignees.includes(user.id))));
  }

  issueChanged() {
    this.issueEntityService.update(this.localIssue);
  }

  public statusColor(status: IssueStatus) {
    switch(status){
      case IssueStatus.TODO: {
        return '#7e8299';
      }
      case IssueStatus.INPROGRESS: {
        return '#8950FC';
      }
      case IssueStatus.DONE: {
        return '#1BC5BD';
      }
    }
  }

  public epicColor(epicKey: string): string {
    return epicKey == null || epicKey == '' ? '#ffffff' : stc(epicKey);
  }
}
