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
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsNavComponent } from './_components/project-card/_components/settings-nav/settings-nav.component';
import { DefaultNavComponent } from './_components/project-card/_components/default-nav/default-nav.component';
import { InvitationNavComponent } from './_components/project-card/_components/invitation-nav/invitation-nav.component';
import { ProjectService } from './_services/project.service';
import { ProjectGroupService } from './_services/project-group.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProjectFeatureKey } from './_store/project.state';
import { ProjectReducer } from './_store/project.reducer';
import { ProjectEffects } from './_store/project.effects';
import { ProjectsResolver } from './_store/projects.resolver';
import { ProjectResolver } from './_store/project.resolver';
import { InvitationResolver } from './_store/invitation.resolver';

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
    NgbNavModule,
    NgbDropdownModule,
    StoreModule.forFeature(ProjectFeatureKey, ProjectReducer),
    EffectsModule.forFeature([ProjectEffects]),
  ],
  providers: [
    ProjectService,
    ProjectGroupService,
    ProjectsResolver,
    ProjectResolver,
    InvitationResolver
  ]
})
export class ProjectModule { }
