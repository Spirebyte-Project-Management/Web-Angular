import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserHTTPService } from 'src/app/modules/data/_services/users/user-http.service';
import { ProjectModel } from '../../_models/project.model';
import { ProjectUpdateModel } from '../../_models/updateProject.model';
import { getSelectedProject } from '../../_store/project.selectors';
import * as ProjectActions from '../../_store/project.actions';

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
    private userHttpservice: UserHTTPService,
    private store: Store,
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
    const getProjectSubscription = this.store.select(getSelectedProject)
      .subscribe(async project => {
        this.currentProject = project;
        this.updateProjectForm.patchValue(project);
        this.isLoadingSubject.next(false);
      });

    this.unsubscribe.push(getProjectSubscription);
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

    this.store.dispatch(ProjectActions.updateProject({ project: updateProject, returnUrl: this.returnUrl }));
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
