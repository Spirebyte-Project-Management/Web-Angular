import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProjectModel } from '../../data/_models/project.model';
import { ProjectEntityService } from '../../data/_services/projects/project-entity.service';
import { Store } from '@ngrx/store';
import { getAuthenticatedUserId } from 'src/app/_store/auth/auth.selectors';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  projects$: Observable<ProjectModel[]>;
  userId$: Observable<string>;
  constructor(private projectEntityService: ProjectEntityService, private store: Store) { }

  ngOnInit(): void {
    this.userId$ = this.store.select(getAuthenticatedUserId).pipe(tap(userId => {
      this.projects$ = this.projectEntityService.entities$.pipe(map(projects => projects.filter(project => project.ownerUserId == userId || project.projectUserIds.includes(userId) || project.invitedUserIds.includes(userId))));
    }));
  }
}
