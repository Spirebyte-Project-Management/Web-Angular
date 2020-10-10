import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { UserRoutingModule } from './user-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CoreModule } from '../../_metronic/core';
import { UserHTTPService } from './_services/user-http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralModule } from '../../_metronic/partials/content/general/general.module';



@NgModule({
  declarations: [UserComponent, PersonalInfoComponent, ChangePasswordComponent],
  imports: [
    UserRoutingModule,
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralModule
  ],
  providers: [UserHTTPService]
})
export class UserModule { }
