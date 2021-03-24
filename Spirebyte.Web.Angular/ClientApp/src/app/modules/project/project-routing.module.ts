import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssuesResolver } from '../data/_services/issues/issues.resolver';
import { ProjectGroupResolver } from '../data/_services/projectGroups/projectGroup.resolver';
import { InvitationGuard } from '../data/_services/projects/guards/invitation.guard';
import { ProjectResolver } from '../data/_services/projects/project.resolver';
import { SprintsResolver } from '../data/_services/sprints/sprints.resolver';
import { UsersResolver } from '../data/_services/users/users.resolver';
import { InvitationComponent } from './invitation/invitation.component';
import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: ':key',
    component: ProjectComponent,
    resolve: {
      projects: ProjectResolver,
      users: UsersResolver,
    },
    canActivate: [InvitationGuard],
    children: [
      {
        path: 'invitation/:userId',
        component: InvitationComponent
      },
      {
        path: 'issue-tracking',
        resolve: {
          issues: IssuesResolver,
          sprints: SprintsResolver,
        },
        loadChildren: () => import('./issue-tracking/issue-tracking.module').then((m) => m.IssueTrackingModule),
      },
      {
        path: 'settings',
        resolve: {
          projectGroups: ProjectGroupResolver,
        },
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      { path: '', redirectTo: 'issue-tracking', pathMatch: 'full' },
      { path: '**', redirectTo: 'issue-tracking', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
