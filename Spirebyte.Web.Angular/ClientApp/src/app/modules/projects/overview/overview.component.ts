import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../_models/project.model';
import { Observable } from 'rxjs';
import { ProjectHTTPService } from '../_services/projects/project-http.service';
import { ProjectEntityService } from '../_services/projects/project-entity.service';
import { AuthService } from '../../auth/_services/auth.service';
import { map } from 'rxjs/operators';

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
