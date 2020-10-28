import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ProjectComponent } from './project.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { IssuesComponent } from './detail/issues/issues.component';
import { CreateIssueComponent } from './detail/create-issue/create-issue.component';


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
        path: ':key',
        component: DetailComponent,
        children: [
          {
            path: 'issues',
            component: IssuesComponent
          },
          {
            path: 'issues/create',
            component: CreateIssueComponent
          },
          {path: '', redirectTo: 'issues', pathMatch: 'full'},
          {path: '**', redirectTo: 'issues', pathMatch: 'full'},
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
