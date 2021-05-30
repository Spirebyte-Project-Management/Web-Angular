import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbDropdownModule, NgbDatepickerModule, NgbNavModule, NgbTooltipModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DataModule } from '../../data/data.module';
import { IssuesComponent } from './issues/issues/issues.component';
import { CreateIssueComponent } from './issues/create-issue/create-issue.component';
import { UpdateIssueComponent } from './issues/update-issue-modal/update-issue.component';
import { DeleteIssueComponent } from './issues/delete-issue/delete-issue.component';
import { CreateSprintComponent } from './sprints/create-sprint/create-sprint.component';
import { BacklogComponent } from './backlog/backlog.component';
import { BacklogItemComponent } from './backlog/_components/backlog-item/backlog-item.component';
import { SprintBoardComponent } from './sprints/sprint-board/sprint-board.component';
import { BoardItemComponent } from './sprints/sprint-board/_components/board-item/board-item.component';
import { SharedModule } from '../_shared/shared.module';
import { CoreModule } from 'src/app/_metronic/core';
import { GeneralModule } from 'src/app/_metronic/partials/content/general/general.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { IssueTrackingRoutingModule } from './issue-tracking-routing.module';
import { EpicListComponent } from './backlog/_components/epic-list/epic-list.component';
import { IssueService } from './_services/issue.services';
import { IssueCommentService } from './_services/issue-comments.services';
import { IssueHistoryService } from './_services/issue-history.services';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IssueEffects } from './_store/issue.effects';
import { IssueReducer } from './_store/issue.reducer';
import { IssueFeatureKey } from './_store/issue.state';
import { IssuesResolver } from './_store/issues.resolver';

@NgModule({
  declarations: [IssuesComponent, CreateIssueComponent, UpdateIssueComponent, DeleteIssueComponent, CreateSprintComponent, BacklogComponent, BacklogItemComponent, SprintBoardComponent, BoardItemComponent, EpicListComponent],
  imports: [
    CommonModule,
    CoreModule,
    GeneralModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbNavModule,
    NgbTooltipModule,
    DragDropModule,
    CKEditorModule,
    InlineSVGModule,
    DataModule,
    SharedModule,
    NgbModalModule,
    IssueTrackingRoutingModule,
    StoreModule.forFeature(IssueFeatureKey, IssueReducer),
    EffectsModule.forFeature([IssueEffects]),
  ],
  providers: [
    IssuesResolver,
    IssueService,
    IssueCommentService,
    IssueHistoryService
  ]
})
export class IssueTrackingModule { }
