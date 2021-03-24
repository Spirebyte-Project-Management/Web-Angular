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

@NgModule({
  declarations: [DetailsComponent, PeopleComponent, PersonComponent, GroupsComponent, InviteUsersModalComponent, GroupComponent, CreateProjectgroupModalComponent, GroupDetailComponent],
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
