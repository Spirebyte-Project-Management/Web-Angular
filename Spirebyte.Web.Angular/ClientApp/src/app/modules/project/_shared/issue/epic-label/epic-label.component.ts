import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import stc from 'string-to-color';
import { IssueModel } from '../../../issue-tracking/_models/issue.model';
import { selectIssue } from '../../../issue-tracking/_store/issue.selectors';

@Component({
  selector: 'app-epic-label',
  templateUrl: './epic-label.component.html',
  styleUrls: ['./epic-label.component.scss']
})
export class EpicLabelComponent implements OnInit {

  @Input() epicId: string;
  @Input() size = 'md';


  epic$: Observable<IssueModel>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.epic$ = this.store.select(selectIssue, { id: this.epicId });
  }

  epicColor(epicKey: string): string {
    return stc(epicKey);
  }

  getSizeClass(){
    return 'label-' + this.size;
  }

}
