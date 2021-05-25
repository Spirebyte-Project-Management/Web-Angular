import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { GrantTypes } from 'src/app/modules/data/_models/grant.model';
import { PermissionSchemeModel } from 'src/app/modules/data/_models/permission-scheme.model';
import { PermissionModel } from 'src/app/modules/data/_models/permission.model';
import { PermissionSchemeEntityService } from 'src/app/modules/data/_services/permission-scheme/permission-scheme-entity.service';

@Component({
  selector: 'app-change-description-modal',
  templateUrl: './change-description-modal.component.html',
  styleUrls: ['./change-description-modal.component.scss']
})
export class ChangeDescriptionModalComponent implements OnInit {
  @Input() permissionScheme: PermissionSchemeModel;

  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, public modal: NgbActiveModal, private permissionSchemeEntityService: PermissionSchemeEntityService) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      name: [
        '', 
        Validators.compose([
          Validators.required, 
        ])
      ],
      description: [''],
    });

    this.formGroup.patchValue(this.permissionScheme);
  }

  update() {
    let updatedPermissionScheme = new PermissionSchemeModel();
    updatedPermissionScheme.name = this.formGroup.value.name;
    updatedPermissionScheme.description = this.formGroup.value.description;

    updatedPermissionScheme.id = this.permissionScheme.id;
    updatedPermissionScheme.projectId = this.permissionScheme.projectId;
    updatedPermissionScheme.permissions = this.permissionScheme.permissions;

    this.permissionSchemeEntityService.update(updatedPermissionScheme);

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
