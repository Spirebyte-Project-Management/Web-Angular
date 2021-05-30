import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/_models/user.model';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';
import stc from 'string-to-color';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { KTUtil } from '../../../../../assets/js/components/util';
import KTLayoutStretchedCard from '../../../../../assets/js/layout/base/stretched-card.js';
import { IssuePermissionKeys } from 'src/app/_metronic/core/constants/IssuePermissionKeys';
import { ProjectModel } from '../../_models/project.model';
import { IssueModel, IssueStatus, IssueType } from '../../issue-tracking/_models/issue.model';
import { Store } from '@ngrx/store';
import { getSelectedProjectEpics, getSelectedProjectIssuesByEpic } from '../../issue-tracking/_store/issue.selectors';
import { updateIssue } from '../../issue-tracking/_store/issue.actions';
import { IssueUpdateModel } from '../../issue-tracking/_models/issue-update.model';
import { UpdateIssueComponent } from '../../issue-tracking/issues/update-issue-modal/update-issue.component';
import { DeleteIssueComponent } from '../../issue-tracking/issues/delete-issue/delete-issue.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-issue-detail-aside',
  templateUrl: './issue-detail-aside.component.html',
  styleUrls: ['./issue-detail-aside.component.scss']
})
export class IssueDetailAsideComponent implements OnInit, OnChanges, AfterViewInit {
  Editor = InlineEditor;

  issuePermissionKeys = IssuePermissionKeys;

  types = IssueType;
  statusus = IssueStatus;
  updateIssueForm: FormGroup;

  @Input() issue: IssueModel;
  @Input() project: ProjectModel;
  issueType = IssueType;
  issueStatus = IssueStatus;

  localIssue: IssueUpdateModel;

  epics$: Observable<IssueModel[]>;
  assignees$: Observable<UserModel[]>;

  epicSubIssues$: Observable<IssueModel[]>;

  activeTab = 1;

  constructor(private userEntityService: UserEntityService, private store: Store, private fb: FormBuilder, private modalService: NgbModal) {
  }

  ngAfterViewInit(): void {
    KTUtil.ready(() => {
      KTLayoutStretchedCard.init("issue_detail_stretched_card");
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.localIssue = new IssueUpdateModel();
    this.localIssue.setIssueUpdate(this.issue);
    this.assignees$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => this.issue.assignees.includes(user.id))));
    this.epicSubIssues$ = this.store.select(getSelectedProjectIssuesByEpic, { epicId: this.issue.id});
  
    KTLayoutStretchedCard.init("issue_detail_stretched_card");
  }

  footerModified(args: any): void {
    KTLayoutStretchedCard.init("issue_detail_stretched_card");
  }

  ngOnInit(): void {
    this.epics$ = this.store.select(getSelectedProjectEpics);
    this.assignees$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => this.issue.assignees.includes(user.id))));
  }

  issueChanged() {
    this.store.dispatch(updateIssue({ issue: this.localIssue }));
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

  updateIssue(issueId: string) {
    const modalRef = this.modalService.open(UpdateIssueComponent, { size: 'lg' });
    modalRef.componentInstance.issueId = issueId;
  }

  deleteIssue(issueId: string) {
    const modalRef = this.modalService.open(DeleteIssueComponent, { size: 'md' });
    modalRef.componentInstance.issueId = issueId;
  }
}
