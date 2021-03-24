import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectCardComponent } from './_components/project-card/project-card.component';
import { IssueDetailAsideComponent } from './_components/issue-detail-aside/issue-detail-aside.component';
import { DataModule } from '../data/data.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { ProjectRoutingModule } from './project-routing.module';
import { CoreModule } from 'src/app/_metronic/core';
import { GeneralModule } from 'src/app/_metronic/partials/content/general/general.module';
import { InvitationComponent } from './invitation/invitation.component';
import { SharedModule } from './_shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsNavComponent } from './_components/project-card/_components/settings-nav/settings-nav.component';
import { DefaultNavComponent } from './_components/project-card/_components/default-nav/default-nav.component';
import { InvitationNavComponent } from './_components/project-card/_components/invitation-nav/invitation-nav.component';

@NgModule({
  declarations: [ProjectComponent, ProjectCardComponent, IssueDetailAsideComponent, InvitationComponent, SettingsNavComponent, DefaultNavComponent, InvitationNavComponent],
  imports: [
    CommonModule,
    GeneralModule,
    DataModule,
    InlineSVGModule,
    ProjectRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgbNavModule
  ]
})
export class ProjectModule { }
