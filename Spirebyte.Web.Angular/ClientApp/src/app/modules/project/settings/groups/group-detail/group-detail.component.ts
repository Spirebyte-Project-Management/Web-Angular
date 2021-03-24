import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { ProjectGroupEntityService } from 'src/app/modules/data/_services/projectGroups/projectGroup-entity.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit, OnDestroy {

  projectGroup$: Observable<ProjectGroupModel>;

  private subscriptions: Subscription[] = [];


  constructor(
    private projectGroupEntityService: ProjectGroupEntityService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.projectGroup$ = this.projectGroupEntityService.entities$.pipe(
          map(projectGroups => projectGroups.find(projectGroup => projectGroup.id == params.get('id')))
        )
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
