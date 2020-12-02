import { Component, OnInit, OnDestroy } from '@angular/core';
import { IssueType, IssueModel, IssueStatus } from '../../_models/issue.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { IssueHTTPService } from '../../_services/issue-http.service';
import { ProjectHTTPService } from '../../_services/project-http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-issue',
  templateUrl: './update-issue.component.html',
  styleUrls: ['./update-issue.component.scss']
})
export class UpdateIssueComponent implements OnInit, OnDestroy {
  types = IssueType;
  status = IssueStatus;
  updateIssueForm: FormGroup;
  hasError: boolean;
  issueKey: string;
  projectKey: string;

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;
  epics$: Observable<IssueModel[]>;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder, private issueHttpService: IssueHTTPService,
              private projectHttpService: ProjectHTTPService,
              private router: Router, private route: ActivatedRoute) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(true);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    const paramsSubscription = this.route.paramMap.subscribe( params => {
      this.issueKey = params.get('issueKey');
      this.projectKey = params.get('key');
      
      this.epics$ = this.issueHttpService.getEpicsForProject(this.projectKey);

      const issueSubscription = this.issueHttpService.getIssue(this.issueKey).subscribe(res => {
        this.updateIssueForm.patchValue(res);
        this.isLoadingSubject.next(false);
      });
      this.unsubscribe.push(issueSubscription);
    });
    this.unsubscribe.push(paramsSubscription);

    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateIssueForm.controls;
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
        ]
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
      const createIssueSubscr = this.issueHttpService
        .updateIssue(issue, this.issueKey)
        .subscribe(
          result => {
            this.router.navigate(['../'], {      
              relativeTo: this.route,
              queryParams: {
                selectedIssue: this.issueKey
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

    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
