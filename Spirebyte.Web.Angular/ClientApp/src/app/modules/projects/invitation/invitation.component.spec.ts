import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, RouterModule, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { AuthService } from '../../auth/_services/auth.service';
import { CreateComponent } from '../create/create.component';
import { BacklogComponent } from '../detail/backlog/backlog.component';
import { CreateIssueComponent } from '../detail/create-issue/create-issue.component';
import { CreateSprintComponent } from '../detail/create-sprint/create-sprint.component';
import { DeleteIssueComponent } from '../detail/delete-issue/delete-issue.component';
import { DetailComponent } from '../detail/detail.component';
import { IssuesComponent } from '../detail/issues/issues.component';
import { SprintBoardComponent } from '../detail/sprint-board/sprint-board.component';
import { UpdateIssueComponent } from '../detail/update-issue/update-issue.component';
import { OverviewComponent } from '../overview/overview.component';
import { ProjectComponent } from '../project.component';
import { ProjectModule } from '../project.module';
import { UpdateComponent } from '../update/update.component';
import { IssuesResolver } from '../_services/issues/issues.resolver';
import { ProjectResolver } from '../_services/projects/project.resolver';
import { SprintsResolver } from '../_services/sprints/sprints.resolver';
import { UsersResolver } from '../_services/users/users.resolver';

import { InvitationComponent } from './invitation.component';

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

describe('InvitationComponent', () => {
  let component: InvitationComponent;
  let fixture: ComponentFixture<InvitationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot(fakeRoutes, { relativeLinkResolution: 'legacy' }), ProjectModule, AppModule],
      declarations: [ InvitationComponent ],
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
    fixture = TestBed.createComponent(InvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
