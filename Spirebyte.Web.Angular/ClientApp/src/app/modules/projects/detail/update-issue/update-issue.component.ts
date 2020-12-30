import { Component, OnInit, OnDestroy } from '@angular/core';
import { IssueType, IssueModel, IssueStatus } from '../../_models/issue.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { IssueHTTPService } from '../../_services/issues/issue-http.service';
import { ProjectHTTPService } from '../../_services/projects/project-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueEntityService } from '../../_services/issues/issue-entity.service';
import { map } from 'rxjs/operators';
import { select } from '@ngrx/store';
import { SettingsModel } from 'src/app/_metronic/partials/content/general/tag-input/_models/settings.model';
import { UserEntityService } from '../../_services/users/user-entity.service';
import { UserModel } from 'src/app/modules/auth/_models/user.model';

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
  issueId: string;
  projectId: string;
  assignees: any;

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;
  epics$: Observable<IssueModel[]>;

  private unsubscribe: Subscription[] = [];

  public assigneeSettings: SettingsModel = {
    skipInvalid: true,
    dropdown: {
      enabled: 1,
      highlightFirst: true,
      classname : 'extra-properties',
      searchKeys: ['fullname']
    },
    enforceWhitelist: true,
      templates: {
        tag(tagData){
          try{
          return `<tag title='${tagData.value}' contenteditable='false' spellcheck="false" class='tagify__tag ${tagData.class ? tagData.class : ""}' ${this.getAttributes(tagData)}>
                      <div class="d-flex align-items-center">
                          <span class="symbol symbol-30 symbol-circle mr-2">
                              ${tagData.pic ?
                              `<img class="symbol-label" onerror="this.style.visibility='hidden'" src='${tagData.pic}'>` : `<span class="symbol-label">${tagData.fullname[0]}</span>`
                              }
                          </span>
                          <span class='tagify__tag-text'>${tagData.fullname}</span>
                      </div>
                  </tag>`
          }
          catch(err){}
      },
      dropdownItem(tagData){
        try {
            let html = '';

            html += `<div class="tagify__dropdown__item ${tagData.class ? tagData.class : ""}" tagifySuggestionIdx="${tagData.tagifySuggestionIdx}">`;
            html += '   <div class="d-flex align-items-center">';
            html += '       <span class="symbol mr-2">';
            html += '           <span class="symbol-label" style="background-image: url(\'' + (tagData.pic ? tagData.pic : '') + '\')">' + (tagData.fullname ? tagData.fullname[0] : '') + '</span>';
            html += '       </span>';
            html += '       <div class="d-flex flex-column">';
            html += '           <a href="#" class="text-dark-75 text-hover-primary font-weight-bold">' + (tagData.fullname ? tagData.fullname : '') + '</a>';
            html += '           <span class="text-muted font-weight-bold">' + (tagData.email ? tagData.email : '') + '</span>';
            html += '       </div>';
            html += '   </div>';
            html += '</div>';

            return html;
        } catch (err) {}
      }
    }
  };

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
    const issueSubscription = this.issueEntityService.entities$.pipe(map(issues => issues.find(issue => issue.id == this.issueId))).subscribe(async issue => {
      if(issue != null){
        const issueCopy = new IssueModel();
        issueCopy.setIssue(issue);
        const issueEditable: any = issueCopy;
          this.userEntityService.entities$.subscribe((res) => {

            const users = this.usersToValue(res);
            if(users.length > 0) {
              issueEditable.assignees = this.usersToValue(res.filter(user => issue.assignees.includes(user.id)));
              this.assignees = issueEditable.assignees;
              this.assigneeSettings.whitelist = users;
              this.updateIssueForm.patchValue(issueEditable);
              this.isLoadingSubject.next(false);
            }
          });
      }
    });
    this.unsubscribe.push(issueSubscription);
  }

  usersToValue(users: UserModel[]): any[]{
    const convertedUsers = [];
    users.forEach(item => {
      convertedUsers.push({ value: item.id, fullname: item.fullname, pic: item.pic });
    });
    return convertedUsers;
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
      const assigneeIdList = [];
      result['assignees'].map(item => assigneeIdList.push(item.value));
      result['assignees'] = assigneeIdList;

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
