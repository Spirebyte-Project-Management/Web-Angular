import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../_models/project.model';
import { Observable } from 'rxjs';
import { ProjectHTTPService } from '../_services/project-http.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  projects$: Observable<ProjectModel[]>;

  constructor(private projectHttpService: ProjectHTTPService) { }

  ngOnInit(): void {
    this.projects$ = this.projectHttpService.getOwnProjects();
  }

}
