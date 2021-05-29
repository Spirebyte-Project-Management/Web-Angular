import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getAuthenticatedUserId } from 'src/app/_store/auth/auth.selectors';
import { selectMyProjects, selectProjects } from '../../project/_store/project.selectors';
import { ProjectModel } from '../../project/_models/project.model';
import { CreateProjectModalComponent } from '../_components/create-project-modal/create-project-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  projects$: Observable<ProjectModel[]>;
  userId$: Observable<string>;
  constructor(private store: Store, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userId$ = this.store.select(getAuthenticatedUserId);
    this.projects$ = this.store.select(selectMyProjects);
  }

  createProject() {
    this.modalService.open(CreateProjectModalComponent);
  }
}
