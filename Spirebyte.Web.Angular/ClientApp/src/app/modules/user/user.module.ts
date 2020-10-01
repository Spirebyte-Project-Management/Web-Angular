import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { UserRoutingModule } from './user-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [UserComponent, PersonalInfoComponent, ChangePasswordComponent],
  imports: [
    UserRoutingModule,
    CommonModule
  ]
})
export class UserModule { }
