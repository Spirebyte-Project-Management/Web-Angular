import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectModel } from 'src/app/modules/data/_models/project.model';
import { ProjectUpdateModel } from 'src/app/modules/data/_models/updateProject.model';
import { ProjectEntityService } from 'src/app/modules/data/_services/projects/project-entity.service';
import { UserHTTPService } from 'src/app/modules/data/_services/users/user-http.service';
import { SettingsModel } from 'src/app/_metronic/partials/content/general/tag-input/_models/settings.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  updateProjectForm: FormGroup;
  hasError: boolean;
  currentProject: ProjectModel;
  returnUrl: string;

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];

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
          this.currentProject = project;
          this.updateProjectForm.patchValue(project);
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
  
}
