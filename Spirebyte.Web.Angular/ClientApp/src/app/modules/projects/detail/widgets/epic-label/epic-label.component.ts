import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import stc from 'string-to-color';
import { IssueModel } from '../../../_models/issue.model';
import { IssueEntityService } from '../../../_services/issues/issue-entity.service';

@Component({
  selector: 'app-epic-label',
  templateUrl: './epic-label.component.html',
  styleUrls: ['./epic-label.component.scss']
})
export class EpicLabelComponent implements OnInit {

  @Input() epicId: string;

  epic$: Observable<IssueModel>;

  constructor(private issueEntityService: IssueEntityService) { }

  ngOnInit(): void {
    this.epic$ = this.issueEntityService.entities$.pipe(map(issues => issues.find(issue => issue.id == this.epicId)));
  }

  public epicColor(epicKey: string): string {
    return stc(epicKey);
  }

}
