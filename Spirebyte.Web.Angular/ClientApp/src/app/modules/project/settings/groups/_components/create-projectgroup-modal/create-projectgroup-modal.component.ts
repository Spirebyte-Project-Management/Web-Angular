import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subscription } from 'rxjs';
import { tap, catchError, map, take, first } from 'rxjs/operators';
import { ProjectModel } from 'src/app/modules/data/_models/project.model';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { ProjectGroupEntityService } from 'src/app/modules/data/_services/projectGroups/projectGroup-entity.service';
import { uniqueProjectGroup } from './_validators/unique-group.validator';

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

  constructor(private fb: FormBuilder, public modal: NgbActiveModal, private projectGroupEntityService: ProjectGroupEntityService) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    let currentProjectGroups = this.projectGroupEntityService.entities$.pipe(map(projectGroups => projectGroups.filter(projectGroup => projectGroup.projectId == this.project.id)));
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

    const sbCreate = this.projectGroupEntityService.add(projectGroup).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(projectGroup);
      }),
    ).subscribe((res: ProjectGroupModel) => this.projectGroup = res);
    this.subscriptions.push(sbCreate);
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
