import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';
import { Store } from '@ngrx/store';
import { IssueType, IssueStatus, IssueModel } from '../../_models/issue.model';
import { getSelectedProjectEpics, selectIssue } from '../../_store/issue.selectors';
import { updateIssue } from '../../_store/issue.actions';
import { IssueUpdateModel } from '../../_models/issue-update.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-update-issue',
  templateUrl: './update-issue.component.html',
  styleUrls: ['./update-issue.component.scss']
})
export class UpdateIssueComponent implements OnInit, OnDestroy {
  Editor = InlineEditor;

  @Input() issueId: string;
  
  types = IssueType;
  status = IssueStatus;
  updateIssueForm: FormGroup;
  hasError: boolean;
  issue: IssueModel;
  assignees: any;

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;
  epics$: Observable<IssueModel[]>;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder, 
              private store: Store,
              private userEntityService: UserEntityService,
              public modal: NgbActiveModal) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(true);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.epics$ = this.store.select(getSelectedProjectEpics);

    this.initForm();
    this.loadIssue();

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateIssueForm.controls;
  }

  loadIssue() {
    const issueSubscription = this.store.select(selectIssue, { id: this.issueId }).subscribe(issue => {
      this.updateIssueForm.patchValue(issue);
      this.issue = issue;
      this.isLoadingSubject.next(false);
    });
    this.unsubscribe.push(issueSubscription);
  }

  initForm() {
    this.updateIssueForm = this.fb.group(
      {
        type: [
          0,
          Validators.compose([
            Validators.required,
          ]),
        ],
        status: [
          0,
          Validators.compose([
            Validators.required,
          ]),
        ],
        title: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        description: [],
        storyPoints: [
          0,
          Validators.compose([
            Validators.min(0)
          ])
        ],
        epicId: [
          ''
        ],
        assignees: []
      });
    }

    update() {
      this.hasError = false;
      const result = {};
      Object.keys(this.f).forEach(key => {
        result[key] = this.f[key].value;
      });

      const issue = new IssueUpdateModel();
      issue.setIssueUpdate(result);
      issue.id = this.issue.id;
      this.store.dispatch(updateIssue({ issue }));
      this.modal.close();
    }

    getUsersPromise(): Promise<any[]> {
      let promise = new Promise<any[]>((resolve, reject) => {
        this.userEntityService.loaded$.subscribe(() => {
          this.userEntityService.entities$.subscribe((res) => {
            const invitedUsers = [];
            res.forEach(item => {
              invitedUsers.push({ value: item.id, fullname: item.fullname, pic: item.pic });
            });
            resolve(invitedUsers);
          });
        });
      });
      return promise;
    }

    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
