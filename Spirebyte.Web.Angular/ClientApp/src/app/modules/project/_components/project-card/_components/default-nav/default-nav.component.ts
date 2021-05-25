import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectModel } from 'src/app/modules/data/_models/project.model';
import { SprintModel } from 'src/app/modules/data/_models/sprint.model';
import { SprintEntityService } from 'src/app/modules/data/_services/sprints/sprint-entity.service';
import { ProjectPermissionKeys } from 'src/app/_metronic/core/constants/ProjectPermissionKeys';

@Component({
  selector: 'app-default-nav',
  templateUrl: './default-nav.component.html',
  styleUrls: ['./default-nav.component.scss']
})
export class DefaultNavComponent implements OnInit {

  projectPermissionKeys = ProjectPermissionKeys;

  @Input() project: ProjectModel;

  activeSprints$: Observable<SprintModel[]>;
  minDate = '0001-01-01T00:00:00Z';

  constructor(
    private router: Router,
    private sprintEntityService: SprintEntityService) { }

  ngOnInit(): void {
    this.activeSprints$ = this.sprintEntityService.entities$.pipe(map(sprints => sprints.filter(sprint => sprint.projectId == this.project.id && sprint.startedAt != this.minDate && sprint.endedAt == this.minDate)));
  }

  isActive(url): boolean {
    return this.router.url.includes(url);
  } 
}
