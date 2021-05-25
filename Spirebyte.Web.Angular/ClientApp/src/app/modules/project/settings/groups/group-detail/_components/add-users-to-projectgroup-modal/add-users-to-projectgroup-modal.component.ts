import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ProjectModel } from 'src/app/modules/data/_models/project.model';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { ProjectGroupEntityService } from 'src/app/modules/data/_services/projectGroups/projectGroup-entity.service';
import { uniqueProjectGroup } from '../../../_components/create-projectgroup-modal/_validators/unique-group.validator';

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

  constructor(private fb: FormBuilder, public modal: NgbActiveModal, private projectGroupEntityService: ProjectGroupEntityService) { }

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
    const upatedProjectGroup = new ProjectGroupModel();
    upatedProjectGroup.id = this.projectGroup.id;
    upatedProjectGroup.name = this.projectGroup.name;
    upatedProjectGroup.projectId = this.projectGroup.projectId;
    upatedProjectGroup.userIds = this.projectGroup.userIds.concat(this.formGroup.value.userIds);

    const sbUpdate = this.projectGroupEntityService.update(upatedProjectGroup).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(upatedProjectGroup);
      }),
    ).subscribe((res: ProjectGroupModel) => this.projectGroup = res);
    this.subscriptions.push(sbUpdate);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
