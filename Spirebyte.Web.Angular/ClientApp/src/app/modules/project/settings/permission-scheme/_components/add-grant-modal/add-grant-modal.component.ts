import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JsonHubProtocol } from '@aspnet/signalr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { GrantModel, GrantTypes } from 'src/app/modules/data/_models/grant.model';
import { PermissionSchemeModel } from 'src/app/modules/data/_models/permission-scheme.model';
import { PermissionModel } from 'src/app/modules/data/_models/permission.model';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { PermissionSchemeEntityService } from 'src/app/modules/data/_services/permission-scheme/permission-scheme-entity.service';

@Component({
  selector: 'app-add-grant-modal',
  templateUrl: './add-grant-modal.component.html',
  styleUrls: ['./add-grant-modal.component.scss']
})
export class AddGrantModalComponent implements OnInit {

  @Input() permissionScheme: PermissionSchemeModel;
  @Input() permission: PermissionModel;

  grantTypes = GrantTypes;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, public modal: NgbActiveModal, private permissionSchemeEntityService: PermissionSchemeEntityService) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      type: [
        '', 
        Validators.compose([
          Validators.required, 
        ])
      ],
      value: [''],
    });
  }

  update() {
    const grant = new GrantModel();
    grant.setGrant(this.formGroup.value);

    let updatedPermissionScheme = new PermissionSchemeModel();
    updatedPermissionScheme.setPermissionScheme(this.permissionScheme);

    let updatedPermission = new PermissionModel();
    updatedPermission.setPermission(this.permission);

    let existingId = updatedPermission.grants.findIndex(g => g.type == grant.type)
    if(existingId == -1) {
      if(grant.value === '""')
      grant.value = '';
      updatedPermission.grants.push(grant);
    } else{
      let currentJsonValue = updatedPermission.grants[existingId].value;
      let currentValue: string[] = currentJsonValue.length > 0 ? JSON.parse(currentJsonValue) : new Array<string>();
      let newValue = grant.value.length > 0 ? JSON.parse(grant.value) : new Array<string>();

      if(currentValue.length > 0){
        for (let index = 0; index < newValue.length; index++) {
          const newId = newValue[index];

          if(currentValue.indexOf(newId) === -1){
            currentValue.push(newId);
          }
        }
        updatedPermission.grants[existingId].value = JSON.stringify(newValue);  
      }
    }


    const permissionIndex = updatedPermissionScheme.permissions.findIndex(perm => perm.key == this.permission.key);
    updatedPermissionScheme.permissions[permissionIndex] = updatedPermission;

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
