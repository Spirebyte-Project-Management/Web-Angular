import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';
import { GroupsComponent } from './groups/groups.component';
import { PeopleComponent } from './people/people.component';


const routes: Routes = [
  {
    path: 'details',
    component: DetailsComponent,
  },
  {
    path: 'people',
    component: PeopleComponent,
  },
  {
    path: 'groups',
    children: [
      {
        path: '',
        component: GroupsComponent,
      },
      {
        path: ':id',
        component: GroupDetailComponent,
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'details', pathMatch: 'full' },
  { path: '**', redirectTo: 'details', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
