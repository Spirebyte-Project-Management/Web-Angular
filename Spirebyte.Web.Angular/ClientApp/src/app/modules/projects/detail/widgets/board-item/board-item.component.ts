import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { IssueType, IssueModel, IssueStatus } from '../../../_models/issue.model';
import { UserEntityService } from '../../../_services/users/user-entity.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent implements OnInit {

  issueType = IssueType;
  doneStatus = IssueStatus.DONE;

  assignees$: Observable<UserModel[]>;

  @Input() issue: IssueModel;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userEntityService: UserEntityService) { }

  ngOnInit(): void {
    this.assignees$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => this.issue.assignees.includes(user.id))));
  }

  isSelected(url): boolean {
    return this.router.url.includes('=' + url);
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
