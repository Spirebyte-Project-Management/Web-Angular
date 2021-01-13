import { Component, OnInit } from '@angular/core';
import { OperationModel } from './_models/operation.model';
import { WebsocketService } from './_services/websocket/websocket.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private websocketService: WebsocketService) { }

  ngOnInit(): void {
    const websocketSub = this.websocketService
    .retrieveMappedObject()
    .subscribe((receivedObj: OperationModel) => {
      console.log(receivedObj)
    });
  }

}
