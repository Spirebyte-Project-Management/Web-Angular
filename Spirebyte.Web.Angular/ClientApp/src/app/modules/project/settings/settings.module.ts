import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { GeneralModule } from 'src/app/_metronic/partials/content/general/general.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DataModule } from '../../data/data.module';
import { PeopleComponent } from './people/people.component';
import { PersonComponent } from './people/_components/person/person.component';
import { CoreModule } from 'src/app/_metronic/core';
import { GroupsComponent } from './groups/groups.component';
import { InviteUsersModalComponent } from './people/_components/invite-users-modal/invite-users-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { GroupComponent } from './groups/_components/group/group.component';
import { CreateProjectgroupModalComponent } from './groups/_components/create-projectgroup-modal/create-projectgroup-modal.component';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';
import { AddUsersToProjectgroupModalComponent } from './groups/group-detail/_components/add-users-to-projectgroup-modal/add-users-to-projectgroup-modal.component';
import { RemoveUserFromProjectgroupModalComponent } from './groups/group-detail/_components/remove-user-from-projectgroup-modal/remove-user-from-projectgroup-modal.component';
import { DeleteProjectgroupConfirmationModalComponent } from './groups/group-detail/_components/delete-projectgroup-confirmation-modal/delete-projectgroup-confirmation-modal.component';
import { PermissionSchemeComponent } from './permission-scheme/permission-scheme.component';
import { PermissionComponent } from './permission-scheme/_components/permission/permission.component';
import { AddGrantModalComponent } from './permission-scheme/_components/add-grant-modal/add-grant-modal.component';
import { RemoveGrantModalComponent } from './permission-scheme/_components/remove-grant-modal/remove-grant-modal.component';
import { ChangeDescriptionModalComponent } from './permission-scheme/_components/change-description-modal/change-description-modal.component';
import { RevertToDefaultModalComponent } from './permission-scheme/_components/revert-to-default-modal/revert-to-default-modal.component';

@NgModule({
  declarations: [DetailsComponent, PeopleComponent, PersonComponent, GroupsComponent, InviteUsersModalComponent, GroupComponent, CreateProjectgroupModalComponent, GroupDetailComponent, AddUsersToProjectgroupModalComponent, RemoveUserFromProjectgroupModalComponent, DeleteProjectgroupConfirmationModalComponent, PermissionSchemeComponent, PermissionComponent, AddGrantModalComponent, RemoveGrantModalComponent, ChangeDescriptionModalComponent, RevertToDefaultModalComponent],
  imports: [
    CommonModule,
    CoreModule,
    SettingsRoutingModule,
    GeneralModule,
    ReactiveFormsModule,
    DataModule,
    NgbModalModule
  ]
})
export class SettingsModule { }
