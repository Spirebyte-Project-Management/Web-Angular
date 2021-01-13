import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as signalR from '@aspnet/signalr';
import { OperationModel } from '../../_models/operation.model';
import { Observable, Subject } from 'rxjs';
import { ProjectEntityService } from '../projects/project-entity.service';
import { IssueEntityService } from '../issues/issue-entity.service';
import { SprintEntityService } from '../sprints/sprint-entity.service';
import { UserEntityService } from '../users/user-entity.service';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';

@Injectable()
export class WebsocketService {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  private url = environment.websocketUrl != null ? environment.websocketUrl : '';

  private receivedMessageObject: OperationModel = new OperationModel();
  private sharedObj = new Subject<OperationModel>();

  private connection: any = new signalR.HubConnectionBuilder()
    .withUrl(`${this.url}/spirebyte`)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  constructor(private http: HttpClient,
            private projectEntityService: ProjectEntityService,
            private issueEntityService: IssueEntityService,
            private sprintEntityService: SprintEntityService,
            private userEntityService: UserEntityService,
            private authService: AuthService) {
    this.connection.onclose(async () => {
      await this.start();
    });
    this.connection.on('operation_pending', (operation) => {
      console.log('Operation pending.');
      console.log(operation);
  });

  this.connection.on('connected', _ => {
    console.log("Connected");
  });

  this.connection.on('disconnected', _ => {
    console.log("Disconnected, invalid token.");
  });

  this.connection.on('operation_completed', (operation) => {
    const smallId = this.authService.currentUserValue.id.split('-').join('')
    if (smallId != operation.sentBy){
      if (operation.projectId != null){
        this.projectEntityService.getByKey(operation.projectId);
      }
      if (operation.issueId != null){
        this.issueEntityService.getByKey(operation.issueId);
      }
      if (operation.sprintId != null){
        this.sprintEntityService.getByKey(operation.sprintId);
      }
    }
  });

  this.connection.on('operation_rejected', (operation) => {
    console.log('Operation rejected.');
    console.log(operation);
  });
  
  this.start();
}

// Strart the connection
public async start() {
  if(this.url == ''){
    console.log('Websocket disabled');
    return;
  }
  try {
    await this.connection.start().then(() => {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      this.connection.invoke('initializeAsync', authData.accessToken);
    });
  }  catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  public stop() {
    this.connection.stop();
  }

  private mapReceivedMessage(output: OperationModel): void {
    this.receivedMessageObject = output;
    this.sharedObj.next(this.receivedMessageObject);
  }

  public retrieveMappedObject(): Observable<OperationModel> {
    return this.sharedObj.asObservable();
  }
}
