import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import stc from 'string-to-color';
import { UserModel } from '../../../../auth/_models/user.model';
import { IssueModel, IssueStatus, IssueType } from '../../../_models/issue.model';
import { ProjectModel } from '../../../_models/project.model';
import { IssueEntityService } from '../../../_services/issues/issue-entity.service';
import { UserEntityService } from '../../../_services/users/user-entity.service';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { KTUtil } from '../../../../../../assets/js/components/util';
import KTLayoutStretchedCard from '../../../../../../assets/js/layout/base/stretched-card';

@Component({
  selector: 'app-issue-detail-aside',
  templateUrl: './issue-detail-aside.component.html',
  styleUrls: ['./issue-detail-aside.component.scss']
})
export class IssueDetailAsideComponent implements OnInit, OnChanges, AfterViewInit {
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

  activeTab = 1;

  constructor(private userEntityService: UserEntityService, private issueEntityService: IssueEntityService, private fb: FormBuilder) {
  }

  ngAfterViewInit(): void {
    KTUtil.ready(() => {
      KTLayoutStretchedCard.init("issue_detail_stretched_card");
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.localIssue = new IssueModel();
    this.localIssue.setIssue(this.issue);
    this.assignees$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => this.issue.assignees.includes(user.id))));
    this.epicSubIssues$ = this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.epicId == this.issue.id)));
  
    KTLayoutStretchedCard.init("issue_detail_stretched_card");
  }

  footerModified(args: any): void {
    KTLayoutStretchedCard.init("issue_detail_stretched_card");
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
      case IssueStatus.TODO || 0: {
        return '#7e8299';
      }
      case IssueStatus.INPROGRESS || 1: {
        return '#8950FC';
      }
      case IssueStatus.DONE || 2: {
        return '#1BC5BD';
      }
    }
  }

  public epicColor(epicKey: string): string {
    return epicKey == null || epicKey == '' ? '#ffffff' : stc(epicKey);
  }
}
