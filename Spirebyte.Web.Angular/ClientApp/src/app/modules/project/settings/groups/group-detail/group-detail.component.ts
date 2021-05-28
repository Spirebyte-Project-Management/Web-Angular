import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { ProjectGroupEntityService } from 'src/app/modules/data/_services/projectGroups/projectGroup-entity.service';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/_models/user.model';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';
import { ProjectModel } from 'src/app/modules/data/_models/project.model';
import { AddUsersToProjectgroupModalComponent } from './_components/add-users-to-projectgroup-modal/add-users-to-projectgroup-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectEntityService } from 'src/app/modules/data/_services/projects/project-entity.service';
import { RemoveUserFromProjectgroupModalComponent } from './_components/remove-user-from-projectgroup-modal/remove-user-from-projectgroup-modal.component';
import { DeleteProjectgroupConfirmationModalComponent } from './_components/delete-projectgroup-confirmation-modal/delete-projectgroup-confirmation-modal.component';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit, OnDestroy {

  project$: Observable<ProjectModel>;
  projectGroup$: Observable<ProjectGroupModel>;
  projectGroupUsers$: Observable<UserModel[]>;

  private subscriptions: Subscription[] = [];


  constructor(
    private projectEntityService: ProjectEntityService,
    private projectGroupEntityService: ProjectGroupEntityService,
    private userEntityService: UserEntityService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.project$ = this.projectEntityService.entities$.pipe(map(projects => projects.find(project => project.id == params.get('key'))));
        this.projectGroup$ = this.projectGroupEntityService.entities$.pipe(
          map(projectGroups => projectGroups.find(projectGroup => projectGroup.id == params.get('id'))),
          tap(projectGroup => this.projectGroupUsers$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => projectGroup.userIds.includes(user.id)))))
        )
      })
    )
  }

  addUsers(project: ProjectModel, projectGroup: ProjectGroupModel) {
    const modalRef = this.modalService.open(AddUsersToProjectgroupModalComponent);
    modalRef.componentInstance.project = project;
    modalRef.componentInstance.projectGroup = projectGroup;
  }

  removeUser(user: UserModel, projectGroup: ProjectGroupModel) {
    const modalRef = this.modalService.open(RemoveUserFromProjectgroupModalComponent);
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.projectGroup = projectGroup;
  }

  deleteProjectGroup(projectGroup: ProjectGroupModel) {
    const modalRef = this.modalService.open(DeleteProjectgroupConfirmationModalComponent);
    modalRef.componentInstance.projectGroup = projectGroup;
    modalRef.componentInstance.route = this.route;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
