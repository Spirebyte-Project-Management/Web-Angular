import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { SettingsModel } from 'src/app/_metronic/partials/content/general/tag-input/_models/settings.model';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { IssueType, IssueStatus, IssueModel } from 'src/app/modules/data/_models/issue.model';
import { IssueEntityService } from 'src/app/modules/data/_services/issues/issue-entity.service';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';


@Component({
  selector: 'app-update-issue',
  templateUrl: './update-issue.component.html',
  styleUrls: ['./update-issue.component.scss']
})
export class UpdateIssueComponent implements OnInit, OnDestroy {
  Editor = InlineEditor;
  
  types = IssueType;
  status = IssueStatus;
  updateIssueForm: FormGroup;
  hasError: boolean;
  issueId: string;
  projectId: string;
  assignees: any;

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;
  epics$: Observable<IssueModel[]>;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder, 
              private issueEntityService: IssueEntityService,
              private userEntityService: UserEntityService,
              private router: Router, private route: ActivatedRoute) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(true);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    const paramsSubscription = this.route.paramMap.subscribe( params => {
      this.issueId = params.get('issueKey');
      this.projectId = params.get('key');
    });
    this.unsubscribe.push(paramsSubscription);

    this.epics$ = this.issueEntityService.entities$.pipe(map(issues => issues.filter(issue => issue.type == IssueType.Epic)));

    this.initForm();
    this.loadIssue();

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateIssueForm.controls;
  }

  loadIssue() {
    const issueSubscription = this.issueEntityService.entities$.pipe(map(issues => issues.find(issue => issue.id == this.issueId))).subscribe(issue => {
      this.updateIssueForm.patchValue(issue);
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

    submit() {
      this.hasError = false;
      const result = {};
      Object.keys(this.f).forEach(key => {
        result[key] = this.f[key].value;
      });

      const issue = new IssueModel();
      issue.setIssue(result);
      issue.id = this.issueId;
      issue.projectId = this.projectId;
      const createIssueSubscr = this.issueEntityService
        .update(issue)
        .subscribe(
          result => {
            this.router.navigate(['../'], {      
              relativeTo: this.route,
              queryParams: {
                selectedIssue: this.issueId
              }
            });
          },
          error => {
            this.hasError = true;
          },
          () => {
          }
        );
      this.unsubscribe.push(createIssueSubscr);
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
