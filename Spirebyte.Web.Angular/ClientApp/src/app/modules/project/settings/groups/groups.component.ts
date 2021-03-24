import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectModel } from 'src/app/modules/data/_models/project.model';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { ProjectGroupEntityService } from 'src/app/modules/data/_services/projectGroups/projectGroup-entity.service';
import { ProjectEntityService } from 'src/app/modules/data/_services/projects/project-entity.service';
import { InviteUsersModalComponent } from '../people/_components/invite-users-modal/invite-users-modal.component';
import { CreateProjectgroupModalComponent } from './_components/create-projectgroup-modal/create-projectgroup-modal.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  project$: Observable<ProjectModel>;
  projectGroups$: Observable<ProjectGroupModel[]>;

  private subscriptions: Subscription[] = [];

  constructor(
    private projectGroupEntityService: ProjectGroupEntityService,
    private projectEntityService: ProjectEntityService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {

    this.subscriptions.push( 
      this.route.paramMap.subscribe(params => {
        let projectId = params.get('key');
        this.project$ = this.projectEntityService.entities$.pipe(map(projects => projects.find(project => project.id == projectId)))
        this.projectGroups$ = this.projectGroupEntityService.entities$.pipe(map(projectGroups => projectGroups.filter(projectGroup => projectGroup.projectId == projectId)));
      })
    );
  }

  inviteUsers(project: ProjectModel) {
    const modalRef = this.modalService.open(CreateProjectgroupModalComponent);
    modalRef.componentInstance.project = project;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
