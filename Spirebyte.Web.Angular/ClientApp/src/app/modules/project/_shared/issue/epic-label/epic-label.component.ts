import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IssueModel } from 'src/app/modules/data/_models/issue.model';
import { IssueEntityService } from 'src/app/modules/data/_services/issues/issue-entity.service';
import stc from 'string-to-color';

@Component({
  selector: 'app-epic-label',
  templateUrl: './epic-label.component.html',
  styleUrls: ['./epic-label.component.scss']
})
export class EpicLabelComponent implements OnInit {

  @Input() epicId: string;
  @Input() size = 'md';


  epic$: Observable<IssueModel>;

  constructor(private issueEntityService: IssueEntityService) { }

  ngOnInit(): void {
    this.epic$ = this.issueEntityService.entities$.pipe(map(issues => issues.find(issue => issue.id == this.epicId)));
  }

  epicColor(epicKey: string): string {
    return stc(epicKey);
  }

  getSizeClass(){
    return 'label-' + this.size;
  }

}
