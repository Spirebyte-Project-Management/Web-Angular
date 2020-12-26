import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import stc from 'string-to-color';
import { IssueModel } from '../../../_models/issue.model';
import { ProjectModel } from '../../../_models/project.model';
import { IssueHTTPService } from '../../../_services/issue-http.service';

@Component({
  selector: 'app-epic-list',
  templateUrl: './epic-list.component.html',
  styleUrls: ['./epic-list.component.scss']
})
export class EpicListComponent implements OnInit {

  @Input() projectKey: string;
  public epics$: Observable<IssueModel[]>;

  constructor(private issueHttpService: IssueHTTPService) { }

  ngOnInit(): void {
    this.epics$ = this.issueHttpService.getEpicsForProject(this.projectKey);
  }

  public epicColor(epicKey: string): string {
    return stc(epicKey);
  }

}
