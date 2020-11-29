import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/_metronic/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectHTTPService } from './_services/project-http.service';
import { ProjectComponent } from './project.component';
import { CreateComponent } from './create/create.component';
import { OverviewComponent } from './overview/overview.component';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from './detail/detail.component';
import { IssuesComponent } from './detail/issues/issues.component';
import { CreateIssueComponent } from './detail/create-issue/create-issue.component';
import { IssueHTTPService } from './_services/issue-http.service';
import { UserHTTPService } from './_services/user-http.service';
import { UpdateComponent } from './update/update.component';
import { GeneralModule } from 'src/app/_metronic/partials/content/general/general.module';
import { InvitationComponent } from './invitation/invitation.component';
import { UpdateIssueComponent } from './detail/update-issue/update-issue.component';
import { DeleteIssueComponent } from './detail/delete-issue/delete-issue.component';
import { BacklogComponent } from './detail/backlog/backlog.component';
import { BacklogItemComponent } from './detail/widgets/backlog-item/backlog-item.component';
import { CreateSprintComponent } from './detail/create-sprint/create-sprint.component';
import { SprintHTTPService } from './_services/sprint-http.service';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [ProjectComponent, CreateComponent, OverviewComponent, DetailComponent, IssuesComponent, CreateIssueComponent, UpdateComponent, InvitationComponent, UpdateIssueComponent, DeleteIssueComponent, BacklogComponent, BacklogItemComponent, CreateSprintComponent],
  imports: [
    ProjectRoutingModule,
    GeneralModule,
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    DragDropModule
  ],
  providers: [ProjectHTTPService, IssueHTTPService, UserHTTPService, SprintHTTPService]
})
export class ProjectModule { }
