import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProjectModel } from 'src/app/modules/data/_models/project.model';
import { ProjectEntityService } from 'src/app/modules/data/_services/projects/project-entity.service';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';
import { UserModel } from 'src/app/_models/user.model';
import { InvitationComponent } from '../../invitation/invitation.component';
import { InviteUsersModalComponent } from './_components/invite-users-modal/invite-users-modal.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {

  project$: Observable<ProjectModel>;
  projectUsers$: Observable<UserModel[]>;
  invitedUsers$: Observable<UserModel[]>;

  private subscriptions: Subscription[] = [];

  constructor(
    private userEntityService: UserEntityService,
    private projectEntityService: ProjectEntityService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {

    this.subscriptions.push( 
      this.route.paramMap.subscribe(params => {
        this.project$ = this.projectEntityService.entities$.pipe(
          map(projects => projects.find(project => project.id == params.get('key'))),
          tap(project => {
            let projectUsers = [];
            projectUsers.push(project.ownerUserId); 
            projectUsers = projectUsers.concat(project.projectUserIds); 
            this.projectUsers$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => projectUsers.includes(user.id))));
            this.invitedUsers$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => project.invitedUserIds.includes(user.id))));            
          })
          )
      })
    );
  }

  inviteUsers(project: ProjectModel) {
    const modalRef = this.modalService.open(InviteUsersModalComponent);
    modalRef.componentInstance.project = project;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
