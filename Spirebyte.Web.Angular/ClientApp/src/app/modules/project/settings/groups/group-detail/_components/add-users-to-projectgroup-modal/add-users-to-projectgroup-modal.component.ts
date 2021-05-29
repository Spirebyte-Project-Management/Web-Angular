import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ProjectModel } from 'src/app/modules/project/_models/project.model';
import { ProjectGroupModel } from 'src/app/modules/project/_models/projectGroup.model';
import * as ProjectActions from '../../../../../_store/project.actions';

@Component({
  selector: 'app-add-users-to-projectgroup-modal',
  templateUrl: './add-users-to-projectgroup-modal.component.html',
  styleUrls: ['./add-users-to-projectgroup-modal.component.scss']
})
export class AddUsersToProjectgroupModalComponent implements OnInit {
  @Input() project: ProjectModel;
  @Input() projectGroup: ProjectGroupModel;

  addableUsers: String[];

  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, public modal: NgbActiveModal, private store: Store) { }

  ngOnInit(): void {
    const projectUsers = this.project.projectUserIds.concat(this.project.ownerUserId);

    const scopedProjectGroup = this.projectGroup;
    this.addableUsers = projectUsers.filter( function( el ) {
      return scopedProjectGroup.userIds.indexOf(el) < 0;
    } );
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      userIds: [''],
    });
  }

  addUsers() {
    const updatedProjectGroup = new ProjectGroupModel();
    updatedProjectGroup.setProjectGroup(this.projectGroup);
    updatedProjectGroup.userIds = this.projectGroup.userIds.concat(this.formGroup.value.userIds);

    this.store.dispatch(ProjectActions.updateProjectGroup({ projectGroup: updatedProjectGroup }));
    this.modal.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
