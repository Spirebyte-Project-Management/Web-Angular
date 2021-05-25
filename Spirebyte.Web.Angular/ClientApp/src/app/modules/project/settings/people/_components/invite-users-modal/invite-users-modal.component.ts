import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ProjectModel } from 'src/app/modules/data/_models/project.model';
import { ProjectUpdateModel } from 'src/app/modules/data/_models/updateProject.model';
import { ProjectEntityService } from 'src/app/modules/data/_services/projects/project-entity.service';

@Component({
  selector: 'app-invite-users-modal',
  templateUrl: './invite-users-modal.component.html',
  styleUrls: ['./invite-users-modal.component.scss']
})
export class InviteUsersModalComponent implements OnInit {

  @Input() project: ProjectModel;

  formGroup: FormGroup;
  excludeIds: string[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, public modal: NgbActiveModal, public projectEnityService: ProjectEntityService) { }

  ngOnInit(): void {
    this.excludeIds.push(this.project.ownerUserId)
    this.excludeIds = this.excludeIds.concat(this.project.invitedUserIds);
    this.excludeIds = this.excludeIds.concat(this.project.projectUserIds);
    console.log(this.excludeIds);
    this.loadForm();
  }

  update(){
    const updateProject = new ProjectUpdateModel();
    updateProject.setUpdateModel(this.project);
    updateProject.invitedUserIds = updateProject.invitedUserIds.concat(this.formGroup.value.invitations);

    this.projectEnityService.update(updateProject);
    this.modal.close();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      invitations: ['', Validators.required],
    });
  }

}
