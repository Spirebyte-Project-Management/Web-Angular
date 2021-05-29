import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssuesResolver } from '../data/_services/issues/issues.resolver';
import { PermissionSchemeResolver } from '../data/_services/permission-scheme/permission-schemes.resolver';
import { InvitationResolver } from './_store/invitation.resolver';
import { SprintsResolver } from '../data/_services/sprints/sprints.resolver';
import { InvitationComponent } from './invitation/invitation.component';
import { ProjectComponent } from './project.component';
import { ProjectResolver } from './_store/project.resolver';

const routes: Routes = [
  {
    path: ':key',
    component: ProjectComponent,
    resolve: {
      project: ProjectResolver,
      permissionSchemes: PermissionSchemeResolver,
      invitation: InvitationResolver
    },
    //canActivate: [InvitationGuard],
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
