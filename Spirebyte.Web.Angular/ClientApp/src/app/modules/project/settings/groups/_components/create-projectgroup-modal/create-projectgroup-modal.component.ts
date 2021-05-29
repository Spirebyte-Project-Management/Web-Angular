import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ProjectModel } from 'src/app/modules/project/_models/project.model';
import { ProjectGroupModel } from 'src/app/modules/project/_models/projectGroup.model';
import { getSelectedProjectGroups } from 'src/app/modules/project/_store/project.selectors';
import { uniqueProjectGroup } from './_validators/unique-group.validator';
import * as ProjectActions from '../../../../_store/project.actions';

@Component({
  selector: 'app-create-projectgroup-modal',
  templateUrl: './create-projectgroup-modal.component.html',
  styleUrls: ['./create-projectgroup-modal.component.scss']
})
export class CreateProjectgroupModalComponent implements OnInit, OnDestroy {

  @Input() project: ProjectModel;

  projectGroup: ProjectGroupModel;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, public modal: NgbActiveModal, private store: Store) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    let currentProjectGroups = this.store.select(getSelectedProjectGroups)
    this.formGroup = this.fb.group({
      name: [
        '', 
        Validators.compose([
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(100),
        ]), 
        Validators.composeAsync([
          uniqueProjectGroup(currentProjectGroups)
        ])
      ],
      userIds: [''],
    });
  }

  create() {
    const projectGroup = new ProjectGroupModel();
    projectGroup.setProjectGroup(this.formGroup.value);
    projectGroup.projectId = this.project.id;

    this.store.dispatch(ProjectActions.addProjectGroup({ projectGroup }))
    this.modal.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
