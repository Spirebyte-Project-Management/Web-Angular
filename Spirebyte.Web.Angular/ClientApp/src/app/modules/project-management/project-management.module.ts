import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/_metronic/core';
import { CreateComponent } from './create/create.component';
import { OverviewComponent } from './overview/overview.component';
import { GeneralModule } from 'src/app/_metronic/partials/content/general/general.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { DataModule } from '../data/data.module';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CreateComponent, OverviewComponent],
  imports: [
    ProjectManagementRoutingModule,
    GeneralModule,
    NgbDropdownModule,
    CommonModule,
    InlineSVGModule,
    CoreModule,
    DataModule,
    ReactiveFormsModule
  ],
})
export class ProjectManagementModule {
}
