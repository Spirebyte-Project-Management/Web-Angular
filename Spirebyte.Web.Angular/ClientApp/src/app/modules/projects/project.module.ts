import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/_metronic/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectHTTPService } from './_services/projects/project-http.service';
import { ProjectComponent } from './project.component';
import { CreateComponent } from './create/create.component';
import { OverviewComponent } from './overview/overview.component';
import { NgbDatepickerModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from './detail/detail.component';
import { IssuesComponent } from './detail/issues/issues.component';
import { CreateIssueComponent } from './detail/create-issue/create-issue.component';
import { IssueHTTPService } from './_services/issues/issue-http.service';
import { UserHTTPService } from './_services/users/user-http.service';
import { UpdateComponent } from './update/update.component';
import { GeneralModule } from 'src/app/_metronic/partials/content/general/general.module';
import { InvitationComponent } from './invitation/invitation.component';
import { UpdateIssueComponent } from './detail/update-issue/update-issue.component';
import { DeleteIssueComponent } from './detail/delete-issue/delete-issue.component';
import { BacklogComponent } from './detail/backlog/backlog.component';
import { BacklogItemComponent } from './detail/widgets/backlog-item/backlog-item.component';
import { CreateSprintComponent } from './detail/create-sprint/create-sprint.component';
import { SprintHTTPService } from './_services/sprints/sprint-http.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IssueDetailAsideComponent } from './detail/widgets/issue-detail-aside/issue-detail-aside.component';
import { EpicListComponent } from './detail/widgets/epic-list/epic-list.component';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { ProjectEntityService } from './_services/projects/project-entity.service';
import { ProjectDataService } from './_services/projects/project-data.service';
import { ProjectResolver } from './_services/projects/project.resolver';
import { IssueEntityService } from './_services/issues/issue-entity.service';
import { IssueDataService } from './_services/issues/issue-data.service';
import { IssuesResolver } from './_services/issues/issues.resolver';
import { EpicLabelComponent } from './detail/widgets/epic-label/epic-label.component';
import { UserDataService } from './_services/users/user-data.service';
import { UserEntityService } from './_services/users/user-entity.service';
import { UsersResolver } from './_services/users/users.resolver';
import { SprintDataService } from './_services/sprints/sprint-data.service';
import { SprintEntityService } from './_services/sprints/sprint-entity.service';
import { SprintsResolver } from './_services/sprints/sprints.resolver';
import { UserSymbolGroupComponent } from './detail/widgets/user-symbol-group/user-symbol-group.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { SprintBoardComponent } from './detail/sprint-board/sprint-board.component';
import { SprintResolver } from './_services/sprints/sprint.resolver';
import { BoardItemComponent } from './detail/widgets/board-item/board-item.component';
import { WebsocketService } from './_services/websocket/websocket.service';
import { SubIssueComponent } from './detail/widgets/sub-issue/sub-issue.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { InvitationGuard } from './_services/projects/guards/invitation.guard';
import { CommentListComponent } from './detail/widgets/comments/comment-list/comment-list.component';
import { PostCommentComponent } from './detail/widgets/comments/post-comment/post-comment.component';

const entityMetadata: EntityMetadataMap = {
  Project: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Issue: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  User: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Sprint: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  }
};

@NgModule({
  declarations: [ProjectComponent, CreateComponent, OverviewComponent, DetailComponent, IssuesComponent, CreateIssueComponent, UpdateComponent, InvitationComponent, UpdateIssueComponent, DeleteIssueComponent, BacklogComponent, BacklogItemComponent, CreateSprintComponent, IssueDetailAsideComponent, EpicListComponent, EpicLabelComponent, UserSymbolGroupComponent, SprintBoardComponent, BoardItemComponent, SubIssueComponent, CommentListComponent, PostCommentComponent],
  imports: [
    ProjectRoutingModule,
    GeneralModule,
    CommonModule,
    InlineSVGModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbNavModule,
    DragDropModule,
    CKEditorModule
  ],
  providers: [InvitationGuard, ProjectHTTPService, ProjectEntityService, ProjectDataService, ProjectResolver, IssueEntityService, IssueDataService, IssuesResolver, IssueHTTPService, UserEntityService, UserDataService, UsersResolver, UserHTTPService, SprintEntityService, SprintDataService, SprintsResolver, SprintResolver, SprintHTTPService, WebsocketService]
})
export class ProjectModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private projectDataService: ProjectDataService,
    private issueDataService: IssueDataService,
    private userDataService: UserDataService,
    private sprintDataService: SprintDataService) {

    eds.registerMetadataMap(entityMetadata);

    entityDataService.registerService('Project', projectDataService);
    entityDataService.registerService('Issue', issueDataService);
    entityDataService.registerService('User', userDataService);
    entityDataService.registerService('Sprint', sprintDataService);
  }
}
