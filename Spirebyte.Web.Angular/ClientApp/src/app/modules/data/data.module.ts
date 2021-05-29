import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityDefinitionService, EntityDataService, EntityMetadataMap } from '@ngrx/data';
import { IssueCommentDataService } from './_services/issues/comments/issue-comment-data.service';
import { IssueHistoryDataService } from './_services/issues/history/issue-history-data.service';
import { IssueDataService } from './_services/issues/issue-data.service';
import { SprintDataService } from './_services/sprints/sprint-data.service';
import { UserDataService } from './_services/users/user-data.service';
import { IssueCommentEntityService } from './_services/issues/comments/issue-comment-entity.service';
import { IssueHistoryEntityService } from './_services/issues/history/issue-history-entity.service';
import { IssueEntityService } from './_services/issues/issue-entity.service';
import { IssueHTTPService } from './_services/issues/issue-http.service';
import { IssuesResolver } from './_services/issues/issues.resolver';
import { SprintEntityService } from './_services/sprints/sprint-entity.service';
import { SprintHTTPService } from './_services/sprints/sprint-http.service';
import { SprintResolver } from './_services/sprints/sprint.resolver';
import { SprintsResolver } from './_services/sprints/sprints.resolver';
import { UserEntityService } from './_services/users/user-entity.service';
import { WebsocketService } from './_services/websocket/websocket.service';
import { PermissionSchemeEntityService } from './_services/permission-scheme/permission-scheme-entity.service';
import { PermissionSchemeDataService } from './_services/permission-scheme/permission-scheme-data.service';
import { PermissionSchemeResolver } from './_services/permission-scheme/permission-schemes.resolver';

const entityMetadata: EntityMetadataMap = {
  PermissionScheme: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Issue: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  IssueComment: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  IssueHistory: {
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
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    IssueEntityService, 
    IssueDataService, 
    IssuesResolver, 
    IssueHTTPService, 
    UserEntityService, 
    UserDataService, 
    SprintEntityService, 
    SprintDataService, 
    SprintsResolver, 
    SprintResolver, 
    SprintHTTPService, 
    IssueCommentEntityService, 
    IssueCommentDataService, 
    IssueHistoryEntityService, 
    IssueHistoryDataService, 
    PermissionSchemeEntityService,
    PermissionSchemeDataService,
    PermissionSchemeResolver,
    WebsocketService]
})
export class DataModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private issueDataService: IssueDataService,
    private userDataService: UserDataService,
    private sprintDataService: SprintDataService,
    private issueCommentDataService: IssueCommentDataService,
    private issueHistoryDataService: IssueHistoryDataService,
    private permissionSchemeDataScervice: PermissionSchemeDataService) {

    eds.registerMetadataMap(entityMetadata);

    entityDataService.registerService('Issue', issueDataService);
    entityDataService.registerService('User', userDataService);
    entityDataService.registerService('Sprint', sprintDataService);
    entityDataService.registerService('IssueComment', issueCommentDataService);
    entityDataService.registerService('IssueHistory', issueHistoryDataService);
    entityDataService.registerService('PermissionScheme', permissionSchemeDataScervice);
  }
}
