import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserModel } from 'src/app/_models/user.model';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { ProjectGroupEntityService } from 'src/app/modules/data/_services/projectGroups/projectGroup-entity.service';

@Component({
  selector: 'app-remove-user-from-projectgroup-modal',
  templateUrl: './remove-user-from-projectgroup-modal.component.html',
  styleUrls: ['./remove-user-from-projectgroup-modal.component.scss']
})
export class RemoveUserFromProjectgroupModalComponent implements OnInit {

  @Input() user: UserModel;
  @Input() projectGroup: ProjectGroupModel;

  private subscriptions: Subscription[] = [];

  constructor(public modal: NgbActiveModal, private projectGroupEntityService: ProjectGroupEntityService) { }

  ngOnInit(): void {
  }

  removeUser() {
    const upatedProjectGroup = new ProjectGroupModel();
    upatedProjectGroup.id = this.projectGroup.id;
    upatedProjectGroup.name = this.projectGroup.name;
    upatedProjectGroup.projectId = this.projectGroup.projectId;
    const scopedUser = this.user;
    upatedProjectGroup.userIds = this.projectGroup.userIds.filter(function (value, index, arr) {
      return scopedUser.id != value;
    });

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
