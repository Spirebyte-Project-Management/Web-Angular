import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'projects',
        loadChildren: () =>
          import('../modules/project-management/project-management.module').then((m) => m.ProjectManagementModule),
      },
      {
        path: 'project',
        loadChildren: () =>
          import('../modules/project/project.module').then((m) => m.ProjectModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'errors/404',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
