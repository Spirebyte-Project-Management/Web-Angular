import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { ProjectResolver } from '../data/_services/projects/project.resolver';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent,
    resolve: {
      projects: ProjectResolver
    },
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {path: '', redirectTo: 'overview', pathMatch: 'full'},
  {path: '**', redirectTo: 'overview', pathMatch: 'full'},
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProjectManagementRoutingModule {}
