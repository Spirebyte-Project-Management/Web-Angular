import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/_services/auth.service';
import { map } from 'rxjs/operators';
import { ProjectModel } from '../../data/_models/project.model';
import { ProjectEntityService } from '../../data/_services/projects/project-entity.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  projects$: Observable<ProjectModel[]>;
  userId: string;
  constructor(private projectEntityService: ProjectEntityService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userId = this.authService.currentUserValue.id;
    this.projects$ = this.projectEntityService.entities$.pipe(map(projects => projects.filter(project => project.ownerUserId == this.userId || project.projectUserIds.includes(this.userId) || project.invitedUserIds.includes(this.userId))));
  }
}
