import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectModel } from '../_models/project.model';
import { ProjectUpdateModel } from '../_models/updateProject.model';
import { ProjectHTTPService } from '../_services/projects/project-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SettingsModel } from 'src/app/_metronic/partials/content/general/tag-input/_models/settings.model';
import { UserHTTPService } from '../_services/users/user-http.service';
import { ProjectEntityService } from '../_services/projects/project-entity.service';

declare function clone<T>(val: T): {[K in (keyof T)]: T[K]};

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  updateProjectForm: FormGroup;
  hasError: boolean;
  currentProject: ProjectModel;
  returnUrl: string;

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];

  public inviteSettings: SettingsModel = {
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

  public memberSettings: SettingsModel = {
    dropdown: {
      enabled: 1,
      highlightFirst: true,
    },
    skipInvalid: true,
      templates: {
        tag(tagData){
          try{
          return `<tag title='${tagData.value}' contenteditable='false' spellcheck="false" class='tagify__tag ${tagData.class ? tagData.class : ""}' ${this.getAttributes(tagData)}>
                      <x title='remove tag' class='tagify__tag__removeBtn'></x>
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
  

  inviteUsersFunction = this.searchUsers.bind(this);
  inviteUsersLink = this.userHttpservice.baseUrl;

  constructor(
    private fb: FormBuilder,
    private projectEntityService: ProjectEntityService,
    private userHttpservice: UserHTTPService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(true);
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '../';
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateProjectForm.controls;
  }

  initForm() {
    this.updateProjectForm = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ],
      description: [],
      invitedUserIds: [],
      projectUserIds: [],
      file: []
    });
    const getParamsSubscription = this.route.paramMap.subscribe(params => {
      const getProjectSubscription = this.projectEntityService.entities$.pipe(map(projects => projects.find(project => project.id == params.get('key'))))
        .subscribe(async project => {
          const projectCopy1 = new ProjectModel();
          projectCopy1.setProject(project);
          const projectCopy:any = projectCopy1;
          
          if (project.invitedUserIds.length > 0) {
            this.inviteSettings.whitelist = await this.getUsersPromise(project.invitedUserIds);
            projectCopy.invitedUserIds = JSON.stringify(this.inviteSettings.whitelist);
          }
          if (project.projectUserIds.length > 0) {
            this.memberSettings.whitelist = await this.getUsersPromise(project.projectUserIds);
            projectCopy.projectUserIds = JSON.stringify(this.memberSettings.whitelist);
          }
          this.currentProject = projectCopy;
          this.updateProjectForm.patchValue(projectCopy);
          this.isLoadingSubject.next(false);
        });

      this.unsubscribe.push(getProjectSubscription);
    });
    this.unsubscribe.push(getParamsSubscription);
  }

  submit() {
    this.hasError = false;
    const result = {};
    Object.keys(this.f).forEach(key => {
      result[key] = this.f[key].value;
    });
    const invitedIdList = [];
    result['invitedUserIds'].map(item => invitedIdList.push(item.value));
    result['invitedUserIds'] = invitedIdList;

    const memberIdList = [];
    if (typeof result['projectUserIds'] == 'string') { result['projectUserIds'] = JSON.parse(result['projectUserIds']); }
    result['projectUserIds'].map(item => memberIdList.push(item.value));
    result['projectUserIds'] = memberIdList;

    const updateProject = new ProjectUpdateModel();
    updateProject.setUpdateModel(result);
    updateProject.id = this.currentProject.id;
    if (updateProject.file != null) updateProject.pic = updateProject.file;
    const updateProjectSubscr = this.projectEntityService
      .update(updateProject)
      .subscribe((project: ProjectModel) => {
        this.router.navigate([this.returnUrl]);
      });
    this.unsubscribe.push(updateProjectSubscr);
  }

  searchUsers(term: string) {
    return this.userHttpservice.searchUsers(term).pipe(map(response => {
      const payload = [];
      response.forEach(item => {
        payload.push({ value: item.id, fullname: item.fullname, pic: item.pic });
      });
      return payload;
    }));
  }

  getUsersPromise(userIds: string[]): Promise<any[]> {
    let promise = new Promise<any[]>((resolve, reject) => {
      this.userHttpservice.getUsersWithIds(userIds).toPromise()
        .then((res) => {
          const invitedUsers = [];
          res.forEach(item => {
            invitedUsers.push({ value: item.id, fullname: item.fullname, pic: item.pic });
          });
          resolve(invitedUsers);
        });
    });
    return promise;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }
  
};