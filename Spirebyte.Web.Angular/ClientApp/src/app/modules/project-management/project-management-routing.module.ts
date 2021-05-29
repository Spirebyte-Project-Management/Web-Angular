import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ProjectsResolver } from '../project/_store/projects.resolver';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent,
    resolve: {
      projects: ProjectsResolver
    },
  },
  {path: '', redirectTo: 'overview', pathMatch: 'full'},
  {path: '**', redirectTo: 'overview', pathMatch: 'full'},
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProjectManagementRoutingModule {}
