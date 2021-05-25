import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { NoticeComponent } from './notice/notice.component';
import { CodePreviewComponent } from './code-preview/code-preview.component';
import { CoreModule } from '../../../core';
import { AvatarFileUploadComponent } from './avatar-file-upload/avatar-file-upload.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { UserSymbolGroupComponent } from './user-symbol-group/user-symbol-group.component';
import { UsersTagInputComponent } from './users-tag-input/users-tag-input.component';
import { DataModule } from 'src/app/modules/data/data.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ProjectGroupsTagInputComponent } from './project-groups-tag-input/project-groups-tag-input.component';

@NgModule({
  declarations: [NoticeComponent, CodePreviewComponent, AvatarFileUploadComponent, TagInputComponent, UserSymbolGroupComponent, UsersTagInputComponent, ProjectGroupsTagInputComponent],
  imports: [
    CommonModule,
    CoreModule,
    HighlightModule,
    PerfectScrollbarModule,
    // ngbootstrap
    NgbNavModule,
    NgbTooltipModule,
    InlineSVGModule,
    DataModule,
    NgSelectModule,
    FormsModule
  ],
  exports: [NoticeComponent, CodePreviewComponent, AvatarFileUploadComponent, TagInputComponent, UserSymbolGroupComponent, UsersTagInputComponent, ProjectGroupsTagInputComponent],
})
export class GeneralModule {}
