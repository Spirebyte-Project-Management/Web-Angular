import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ProjectComponent } from './project.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { IssuesComponent } from './detail/issues/issues.component';
import { CreateIssueComponent } from './detail/create-issue/create-issue.component';
import { UpdateComponent } from './update/update.component';
import { InvitationComponent } from './invitation/invitation.component';
import { UpdateIssueComponent } from './detail/update-issue/update-issue.component';
import { DeleteIssueComponent } from './detail/delete-issue/delete-issue.component';
import { BacklogComponent } from './detail/backlog/backlog.component';
import { CreateSprintComponent } from './detail/create-sprint/create-sprint.component';


const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent
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
        children: [
          {
            path: 'issues',
            component: IssuesComponent
          },
          {
            path: 'backlog',
            component: BacklogComponent
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
          {path: '', redirectTo: 'backlog', pathMatch: 'full'},
          {path: '**', redirectTo: 'backlog', pathMatch: 'full'},
        ]
      },
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: '**', redirectTo: 'overview', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProjectRoutingModule {}
