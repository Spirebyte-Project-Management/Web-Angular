import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/_models/user.model';
import { ProjectModel } from 'src/app/modules/data/_models/project.model';
import { SprintEntityService } from 'src/app/modules/data/_services/sprints/sprint-entity.service';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';
import { Store } from '@ngrx/store';
import { getAuthenticatedUserId } from 'src/app/_store/auth/auth.selectors';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: ProjectModel;

  userId$: Observable<string>;
  pageUrl: string;

  projectUsers$: Observable<UserModel[]>;

  constructor(
    private router: Router,
    private store: Store,
    private userEntityService: UserEntityService,
    private sprintEntityService: SprintEntityService) 
    { }

  ngOnInit(): void {
    this.userId$ = this.store.select(getAuthenticatedUserId);
    this.pageUrl = this.router.url;

    let ids = this.project.projectUserIds.concat(this.project.ownerUserId);
    this.projectUsers$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => ids.includes(user.id))));
  }

  isActive(url): boolean {
    return this.router.url.includes(url);
  } 
}
