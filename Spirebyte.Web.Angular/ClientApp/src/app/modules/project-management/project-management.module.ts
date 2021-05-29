import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/_metronic/core';
import { OverviewComponent } from './overview/overview.component';
import { GeneralModule } from 'src/app/_metronic/partials/content/general/general.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { DataModule } from '../data/data.module';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModule } from '../project/project.module';
import { CreateProjectModalComponent } from './_components/create-project-modal/create-project-modal.component';

@NgModule({
  declarations: [OverviewComponent, CreateProjectModalComponent],
  imports: [
    ProjectManagementRoutingModule,
    GeneralModule,
    NgbDropdownModule,
    CommonModule,
    InlineSVGModule,
    CoreModule,
    DataModule,
    ProjectModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ProjectManagementModule {
}
