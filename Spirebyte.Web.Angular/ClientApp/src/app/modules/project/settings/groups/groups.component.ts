import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectGroupModel } from 'src/app/modules/project/_models/projectGroup.model';
import { ProjectModel } from '../../_models/project.model';
import { getSelectedProject, getSelectedProjectGroups, selectedProjectHasGroups } from '../../_store/project.selectors';
import { CreateProjectgroupModalComponent } from './_components/create-projectgroup-modal/create-projectgroup-modal.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  project$: Observable<ProjectModel>;
  projectGroups$: Observable<ProjectGroupModel[]>;
  hasProjectGroups$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    this.project$ = this.store.select(getSelectedProject);
    this.projectGroups$ = this.store.select(getSelectedProjectGroups);
    this.hasProjectGroups$ = this.store.select(selectedProjectHasGroups);
  }

  inviteUsers(project: ProjectModel) {
    const modalRef = this.modalService.open(CreateProjectgroupModalComponent);
    modalRef.componentInstance.project = project;
  }
}
