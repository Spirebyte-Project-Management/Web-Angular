import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../_models/project.model';
import { Observable } from 'rxjs';
import { ProjectHTTPService } from '../_services/projects/project-http.service';
import { ProjectEntityService } from '../_services/projects/project-entity.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  projects$: Observable<ProjectModel[]>;

  constructor(private projectEntityService: ProjectEntityService) { }

  ngOnInit(): void {
    this.projects$ = this.projectEntityService.entities$;
  }

}
