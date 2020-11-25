import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueModel, IssueStatus, IssueType } from '../../../_models/issue.model';

@Component({
  selector: 'app-backlog-item',
  templateUrl: './backlog-item.component.html',
  styleUrls: ['./backlog-item.component.scss']
})
export class BacklogItemComponent implements OnInit {

  issueType = IssueType;

  @Input() issue: IssueModel;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }

  setSelectedIssue(key: string): void {
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        selectedIssue: key
      }
    });
  }
}
