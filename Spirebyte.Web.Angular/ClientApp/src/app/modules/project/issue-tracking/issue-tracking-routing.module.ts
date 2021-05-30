import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SprintsResolver } from '../../data/_services/sprints/sprints.resolver';
import { BacklogComponent } from './backlog/backlog.component';
import { IssuesComponent } from './issues/issues/issues.component';
import { SprintBoardComponent } from './sprints/sprint-board/sprint-board.component';
import { IssuesResolver } from './_store/issues.resolver';


const routes: Routes = [
  {
    path: '',
    resolve: {
      issues: IssuesResolver,
      sprints: SprintsResolver,
    },
    children: [
      {
        path: 'issues',
        component: IssuesComponent,
      },
      {
        path: 'backlog',
        component: BacklogComponent,
      },
      {
        path: 'sprint/:sprintKey',
        component: SprintBoardComponent,
      },
      { path: '', redirectTo: 'backlog', pathMatch: 'full' },
      { path: '**', redirectTo: 'backlog', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueTrackingRoutingModule { }
