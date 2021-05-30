import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityDefinitionService, EntityDataService, EntityMetadataMap } from '@ngrx/data';
import { SprintDataService } from './_services/sprints/sprint-data.service';
import { UserDataService } from './_services/users/user-data.service';
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
    UserEntityService, 
    UserDataService, 
    SprintEntityService, 
    SprintDataService, 
    SprintsResolver, 
    SprintResolver, 
    SprintHTTPService,
    PermissionSchemeEntityService,
    PermissionSchemeDataService,
    PermissionSchemeResolver,
    WebsocketService]
})
export class DataModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private userDataService: UserDataService,
    private sprintDataService: SprintDataService,
    private permissionSchemeDataScervice: PermissionSchemeDataService) {

    eds.registerMetadataMap(entityMetadata);

    entityDataService.registerService('User', userDataService);
    entityDataService.registerService('Sprint', sprintDataService);
    entityDataService.registerService('PermissionScheme', permissionSchemeDataScervice);
  }
}
