import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ProjectModel } from '../_models/project.model';
import { ProjectHTTPService } from '../_services/project-http.service';
import { UserModel } from '../../auth/_models/user.model';
import { map, tap } from 'rxjs/operators';
import { UserHTTPService } from '../_services/user-http.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  projectKey: string;
  project$: Observable<ProjectModel>;
  projectUsers$: Observable<UserModel[]>;


  private unsubscribe: Subscription[] = [];
  constructor(private route: ActivatedRoute, private projectHttpService: ProjectHTTPService, private userHttpService: UserHTTPService) { }

  ngOnInit(): void {
    const paramsSubscription =   this.route.paramMap.subscribe( params => {
      this.projectKey = params.get('key');
      this.project$ = this.projectHttpService.getProject(this.projectKey).pipe(tap(res => {
        const ids = [];
        ids.push(res.ownerUserId);
        ids.push(res.ownerUserId);
        ids.push.apply(res.projectUserIds);
        
        this.projectUsers$ = this.userHttpService.getUsersWithIds(ids);
      }));
    });
    this.unsubscribe.push(paramsSubscription);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
