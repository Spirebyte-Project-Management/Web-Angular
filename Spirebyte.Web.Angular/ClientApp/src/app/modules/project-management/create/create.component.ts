import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { doesKeyExistValidator } from './does-key-exist.validator';
import { ProjectModel } from '../../data/_models/project.model';
import { ProjectEntityService } from '../../data/_services/projects/project-entity.service';
import { ProjectHTTPService } from '../../data/_services/projects/project-http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  createProjectForm: FormGroup;
  hasError: boolean;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private projectEntityService: ProjectEntityService,
              private projectHttpService: ProjectHTTPService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.createProjectForm.controls;
  }

  initForm() {
    this.createProjectForm = this.fb.group(
      {
        title: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        projectId: [
          '',
          Validators.compose([
            Validators.required,
          ]),
          Validators.composeAsync([
            doesKeyExistValidator(this.projectHttpService)
          ]),
        ],
        description: []
      });
    }

    submit() {
      this.hasError = false;
      const result = {};
      Object.keys(this.f).forEach(key => {
        result[key] = this.f[key].value;
      });
      const project = new ProjectModel();
      project.setProject(result);
      const createProjectSubscr = this.projectEntityService
        .add(project)
        .subscribe(
          () => {
            this.router.navigate(['/projects']);
          }
        );
      this.unsubscribe.push(createProjectSubscr);
    }

    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

}
