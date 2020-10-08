import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ProjectComponent } from './project.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';


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
