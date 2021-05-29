import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';
import { UserModel } from 'src/app/_models/user.model';
import { ProjectModel } from '../../_models/project.model';
import { getSelectedProject } from '../../_store/project.selectors';
import { InviteUsersModalComponent } from './_components/invite-users-modal/invite-users-modal.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  project$: Observable<ProjectModel>;
  projectUsers$: Observable<UserModel[]>;
  invitedUsers$: Observable<UserModel[]>;

  constructor(
    private userEntityService: UserEntityService,
    private store: Store,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.project$ = this.store.select(getSelectedProject).pipe(
      tap(project => {
        let projectUsers = [];
        projectUsers.push(project.ownerUserId);
        projectUsers = projectUsers.concat(project.projectUserIds);
        this.projectUsers$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => projectUsers.includes(user.id))));
        this.invitedUsers$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => project.invitedUserIds.includes(user.id))));
      })
    )
  }

  inviteUsers(project: ProjectModel) {
    const modalRef = this.modalService.open(InviteUsersModalComponent);
    modalRef.componentInstance.project = project;
  }
}
