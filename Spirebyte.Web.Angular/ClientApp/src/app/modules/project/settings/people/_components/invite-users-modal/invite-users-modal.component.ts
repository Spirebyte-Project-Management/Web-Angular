import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ProjectModel } from 'src/app/modules/project/_models/project.model';
import { ProjectUpdateModel } from 'src/app/modules/project/_models/updateProject.model';
import * as ProjectActions from '../../../../_store/project.actions';

@Component({
  selector: 'app-invite-users-modal',
  templateUrl: './invite-users-modal.component.html',
  styleUrls: ['./invite-users-modal.component.scss']
})
export class InviteUsersModalComponent implements OnInit {

  @Input() project: ProjectModel;

  formGroup: FormGroup;
  excludeIds: string[] = [];

  constructor(private fb: FormBuilder, public modal: NgbActiveModal, public store: Store) { }

  ngOnInit(): void {
    this.excludeIds.push(this.project.ownerUserId)
    this.excludeIds = this.excludeIds.concat(this.project.invitedUserIds);
    this.excludeIds = this.excludeIds.concat(this.project.projectUserIds);
    this.loadForm();
  }

  update(){
    const updateProject = new ProjectUpdateModel();
    updateProject.setUpdateModel(this.project);
    updateProject.invitedUserIds = updateProject.invitedUserIds.concat(this.formGroup.value.invitations);

    this.store.dispatch(ProjectActions.updateProject({ project: updateProject }));
    this.modal.close();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      invitations: ['', Validators.required],
    });
  }

}
