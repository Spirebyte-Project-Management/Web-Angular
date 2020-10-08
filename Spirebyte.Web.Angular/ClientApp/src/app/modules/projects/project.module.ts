import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/_metronic/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectHTTPService } from './_services/project-http.service';
import { ProjectComponent } from './project.component';
import { CreateComponent } from './create/create.component';
import { OverviewComponent } from './overview/overview.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ProjectComponent, CreateComponent, OverviewComponent],
  imports: [
    ProjectRoutingModule,
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ],
  providers: [ProjectHTTPService]
})
export class ProjectModule { }
