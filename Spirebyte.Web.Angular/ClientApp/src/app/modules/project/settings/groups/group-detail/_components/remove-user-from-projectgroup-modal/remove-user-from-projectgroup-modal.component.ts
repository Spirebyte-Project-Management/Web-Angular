import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserModel } from 'src/app/_models/user.model';
import { ProjectGroupModel } from 'src/app/modules/project/_models/projectGroup.model';
import { Store } from '@ngrx/store';
import * as ProjectActions from '../../../../../_store/project.actions';

@Component({
  selector: 'app-remove-user-from-projectgroup-modal',
  templateUrl: './remove-user-from-projectgroup-modal.component.html',
  styleUrls: ['./remove-user-from-projectgroup-modal.component.scss']
})
export class RemoveUserFromProjectgroupModalComponent implements OnInit {

  @Input() user: UserModel;
  @Input() projectGroup: ProjectGroupModel;

  private subscriptions: Subscription[] = [];

  constructor(public modal: NgbActiveModal, private store: Store) { }

  ngOnInit(): void {
  }

  removeUser() {
    const updatedProjectGroup = new ProjectGroupModel();
    updatedProjectGroup.setProjectGroup(this.projectGroup);
    const scopedUser = this.user;
    updatedProjectGroup.userIds = this.projectGroup.userIds.filter(function (value, index, arr) {
      return scopedUser.id != value;
    });

    this.store.dispatch(ProjectActions.updateProjectGroup({ projectGroup: updatedProjectGroup}))
    this.modal.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
