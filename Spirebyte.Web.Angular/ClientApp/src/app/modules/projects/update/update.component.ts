import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProjectModel } from "../_models/project.model";
import { ProjectUpdateModel } from "../_models/updateProject.model";
import { ProjectHTTPService } from "../_services/project-http.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, BehaviorSubject, Observable } from "rxjs";
import { first } from 'rxjs/operators';

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"]
})
export class UpdateComponent implements OnInit, OnDestroy {
  updateProjectForm: FormGroup;
  hasError: boolean;
  currentProject: ProjectModel;

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private projectHttpservice: ProjectHTTPService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(true);
    this.isLoading$ = this.isLoadingSubject.asObservable();
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
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ],
      description: [],
      file: []
    });
    const getParamsSubscription = this.route.paramMap.subscribe(params => {
      const getProjectSubscription = this.projectHttpservice
        .getProject(params.get('key'))
        .subscribe(project => {
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
    const updateProjectSubscr = this.projectHttpservice
      .updateProject(updateProject, this.currentProject.key)
      .pipe(first())
      .subscribe((project: ProjectUpdateModel) => {
        this.router.navigate(['../']);
      });
    this.unsubscribe.push(updateProjectSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }
}
