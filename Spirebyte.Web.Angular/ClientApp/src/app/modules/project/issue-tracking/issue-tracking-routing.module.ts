import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BacklogComponent } from './backlog/backlog.component';
import { CreateIssueComponent } from './issues/create-issue/create-issue.component';
import { DeleteIssueComponent } from './issues/delete-issue/delete-issue.component';
import { IssuesComponent } from './issues/issues/issues.component';
import { UpdateIssueComponent } from './issues/update-issue/update-issue.component';
import { CreateSprintComponent } from './sprints/create-sprint/create-sprint.component';
import { SprintBoardComponent } from './sprints/sprint-board/sprint-board.component';


const routes: Routes = [
  {
    path: 'issues',
    component: IssuesComponent,
  },
  {
    path: 'backlog',
    component: BacklogComponent,
  },
  {
    path: 'issues/:issueKey/delete',
    component: DeleteIssueComponent
  },
  {
    path: 'issues/:issueKey/update',
    component: UpdateIssueComponent
  },
  {
    path: 'issues/create',
    component: CreateIssueComponent
  },
  {
    path: 'sprint/create',
    component: CreateSprintComponent
  },
  {
    path: 'sprint/:sprintKey',
    component: SprintBoardComponent,
  },
  { path: '', redirectTo: 'backlog', pathMatch: 'full' },
  { path: '**', redirectTo: 'backlog', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueTrackingRoutingModule { }
