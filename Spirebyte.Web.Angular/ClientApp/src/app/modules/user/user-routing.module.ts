import { ChangePasswordComponent } from './change-password/change-password.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { UserComponent } from './user.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'personal-information',
        component: PersonalInfoComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {path: '', redirectTo: 'personal-information', pathMatch: 'full'},
      {path: '**', redirectTo: 'personal-information', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule {}
