import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ProjectModel } from '../_models/project.model';
import { ProjectHTTPService } from '../_services/project-http.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  projectKey: string;
  project$: Observable<ProjectModel>;

  private unsubscribe: Subscription[] = [];
  constructor(private route: ActivatedRoute, private projectHttpService: ProjectHTTPService) { }

  ngOnInit(): void {
    const paramsSubscription =   this.route.paramMap.subscribe( params => {
      this.projectKey = params.get('key');
      this.project$ = this.projectHttpService.getProject(this.projectKey);
    });
    this.unsubscribe.push(paramsSubscription);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
