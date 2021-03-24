import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { convertToParamMap, Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { CreateComponent } from '../../create/create.component';
import { InvitationComponent } from '../../invitation/invitation.component';
import { OverviewComponent } from '../../overview/overview.component';
import { ProjectComponent } from '../../project.component';
import { ProjectModule } from '../../project.module';
import { UpdateComponent } from '../../update/update.component';
import { IssuesResolver } from '../../_services/issues/issues.resolver';
import { ProjectResolver } from '../../_services/projects/project.resolver';
import { SprintsResolver } from '../../_services/sprints/sprints.resolver';
import { UsersResolver } from '../../_services/users/users.resolver';
import { CreateIssueComponent } from '../create-issue/create-issue.component';
import { CreateSprintComponent } from '../create-sprint/create-sprint.component';
import { DeleteIssueComponent } from '../delete-issue/delete-issue.component';
import { DetailComponent } from '../detail.component';
import { IssuesComponent } from '../issues/issues.component';
import { SprintBoardComponent } from '../sprint-board/sprint-board.component';
import { UpdateIssueComponent } from '../update-issue/update-issue.component';

import { BacklogComponent } from './backlog.component';

const mockActivatedRoute = {
  parent: {
    paramMap: of(convertToParamMap({key: 't'}))
  },
  paramMap: of(convertToParamMap({userId: 'test'}))
};


const fakeRoutes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    resolve: {
      projects: ProjectResolver
    },
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: ':key/update',
        component: UpdateComponent
      },
      {
        path: ':key',
        component: DetailComponent,
        resolve: {
          issues: IssuesResolver,
          users: UsersResolver,
          sprints: SprintsResolver,
        },
        //canActivate: [InvitationGuard],
        children: [
          {
            path: 'issues',
            component: IssuesComponent,
          },
          {
            path: 'backlog',
            component: BacklogComponent,
          },
          {
            path: 'invitation/:userId',
            component: InvitationComponent
          },
          {
            path: 'issues/:issueKey/delete',
            component: DeleteIssueComponent
          },
          {
            path: 'issues/:issueKey/update',
            component: UpdateIssueComponent
          },
          {
            path: 'issues/create',
            component: CreateIssueComponent
          },
          {
            path: 'sprint/create',
            component: CreateSprintComponent
          },
          {
            path: 'sprint/:sprintKey',
            component: SprintBoardComponent,
          },
          {path: '', redirectTo: 'backlog', pathMatch: 'full'},
          {path: '**', redirectTo: 'backlog', pathMatch: 'full'},
        ]
      },
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: '**', redirectTo: 'overview', pathMatch: 'full'},
    ]
  }
];

describe('BacklogComponent', () => {
  let component: BacklogComponent;
  let fixture: ComponentFixture<BacklogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot(fakeRoutes, { relativeLinkResolution: 'legacy' }), ProjectModule, AppModule],
      declarations: [BacklogComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
