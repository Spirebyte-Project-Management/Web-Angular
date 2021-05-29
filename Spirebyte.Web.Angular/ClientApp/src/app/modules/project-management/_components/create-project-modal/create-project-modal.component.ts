import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { doesKeyExistValidator } from 'src/app/modules/project-management/_components/create-project-modal/does-key-exist.validator';
import { ProjectModel } from '../../../project/_models/project.model';
import { ProjectService } from '../../../project/_services/project.service';
import * as ProjectActions from '../../../project/_store/project.actions';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss']
})
export class CreateProjectModalComponent implements OnInit {

  createProjectForm: FormGroup;
  hasError: boolean;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private store: Store,
              private projectService: ProjectService,
              public modal: NgbActiveModal,
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
            doesKeyExistValidator(this.projectService)
          ]),
        ],
        description: []
      });
    }

    create() {
      this.hasError = false;
      const result = {};
      Object.keys(this.f).forEach(key => {
        result[key] = this.f[key].value;
      });
      const project = new ProjectModel();
      project.setProject(result);
      this.store.dispatch(ProjectActions.createProject({ project }))
      this.modal.close();
    }

    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }


}
