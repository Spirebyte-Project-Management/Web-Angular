import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { concatMap, map, catchError, switchMap, tap, mergeMap, first } from 'rxjs/operators';
import { AppState } from 'src/app/_store/app.state';
import { UserEntityService } from '../../data/_services/users/user-entity.service';
import { ProjectGroupService } from '../_services/project-group.service';
import { ProjectService } from '../_services/project.service';
import * as ProjectActions from './project.actions';
import { getSelectedProject, getSelectedProjectGroups, getSelectedProjectId } from './project.selectors';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private projectGroupService: ProjectGroupService,
    private userEntityService: UserEntityService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  getProjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.getProjects),
      concatMap((action) => {
        return this.projectService.getAll().pipe(
          map((projects) => ProjectActions.getProjectsSuccess({ projects })),
          catchError((error: HttpErrorResponse) => of(ProjectActions.getProjectsFailure({ error: error.error }))),
        );
      })
    );
  });

  getProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.getSingleProject),
      concatMap((action) => {
        return this.projectService.getById(action.projectId).pipe(
          map((project) => ProjectActions.getSingleProjectSuccess({ project })),
          catchError((error: HttpErrorResponse) => of(ProjectActions.getSingleProjectFailure({ error: error.error }))),
        );
      })
    );
  });

  createProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.createProject),
      concatMap((action) => {
        return this.projectService.add(action.project).pipe(
          map((project) => ProjectActions.createProjectSuccess({ project })),
          catchError((error: HttpErrorResponse) => of(ProjectActions.createProjectFailure({ error: error.error }))),
        );
      })
    );
  });

  updateProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.updateProject),
      concatMap((action) => {
        return this.projectService.update(action.project).pipe(
          map((project) => ProjectActions.updateProjectSuccess({ project: action.project })),
          catchError((error: HttpErrorResponse) => of(ProjectActions.updateProjectFailure({ error: error.error }))),
        );
      })
    );
  });

  updatedProjectSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.updateProjectSuccess),
      tap((action) => {
        if(action.returnUrl !== undefined) {
          this.router.navigate([action.returnUrl]);
        }
      }),
      switchMap((action) => {
        return [
          ProjectActions.getSingleProject({ projectId: action.project.id })
        ]
      }),
    )
  });

  joinProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.joinProject),
      mergeMap((action) => this.store.select(getSelectedProjectId).pipe(first(), map((projectId: any) => [action, projectId]))),
      concatMap(([action, projectId]) => {
        return this.projectService.joinProject(projectId, action.userId).pipe(
          map((project) => ProjectActions.joinProjectSuccess({ userId: action.userId })),
          catchError((error: HttpErrorResponse) => of(ProjectActions.joinProjectFailure({ error: error.error }))),
        );
      })
    );
  });

  joinProjectSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.joinProjectSuccess),
      mergeMap((action) => this.store.select(getSelectedProjectId).pipe(first(), map((projectId: any) => [action, projectId]))),
      tap(([action, projectId]) => {
        this.router.navigate(['project', projectId]);
        this.userEntityService.getByKey(action.userId);
      })
    );
  }, { dispatch: false });

  leaveProjectSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.leaveProjectSuccess),
      tap(() => {
        this.router.navigate(['projects']);
      })
    );
  }, { dispatch: false });

  leaveProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.leaveProject),
      mergeMap((action) => this.store.select(getSelectedProjectId).pipe(first(), map((projectId: any) => [action, projectId]))),
      concatMap(([action, projectId]) => {
        return this.projectService.leaveProject(projectId, action.userId).pipe(
          map((project) => ProjectActions.leaveProjectSuccess({ userId: action.userId })),
          catchError((error: HttpErrorResponse) => of(ProjectActions.leaveProjectFailure({ error: error.error }))),
        );
      })
    );
  });

  selectedProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.selectProject),
      mergeMap(action => this.store.select(getSelectedProject).pipe(first(),tap(project => {
        const ids = project.projectUserIds.concat(project.ownerUserId, project.invitedUserIds);

        this.userEntityService.clearCache();
        this.userEntityService.getWithQuery({'userIds': JSON.stringify(ids)});
        this.userEntityService.setLoaded(true);
      }),
      map(() => action))),
      switchMap((action) => {
        return [
          ProjectActions.loadProjectGroups({ projectId: action.projectId })
        ]
      })
    )
  });

  // getSingleProject$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ProjectActions.getSingleProjectSuccess),
  //     map((action) => {
  //       const ids = action.project.projectUserIds.concat(action.project.ownerUserId, action.project.invitedUserIds);

  //       this.userEntityService.clearCache();
  //       this.userEntityService.getWithQuery({'userIds': JSON.stringify(ids)});
  //       this.userEntityService.setLoaded(true);
  //     })
  //   )
  // }, { dispatch: false })

  loadProjectGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.loadProjectGroups),
      concatMap((action) => {
        return this.projectGroupService.getByProjectId(action.projectId).pipe(
          map((projectGroups) => ProjectActions.loadProjectGroupsSuccess({ projectGroups })),
          catchError((error: HttpErrorResponse) => of(ProjectActions.loadProjectGroupsFailure({ error: error.error }))),
        );
      })
    );
  });

  loadSingleProjectGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.loadSingleProjectGroup),
      concatMap((action) => {
        return this.projectGroupService.getById(action.projectGroupId).pipe(
          map((projectGroup) => ProjectActions.loadSingleProjectGroupSuccess({ projectGroup })),
          catchError((error: HttpErrorResponse) => of(ProjectActions.loadSingleProjectGroupFailure({ error: error.error }))),
        );
      })
    );
  });


  addProjectGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.addProjectGroup),
      concatMap((action) => {
        return this.projectGroupService.add(action.projectGroup).pipe(
          map((projectGroup) => {
            return ProjectActions.addProjectGroupSuccess({ projectGroup })
          }),
          catchError((error: HttpErrorResponse) => of(ProjectActions.addProjectGroupFailure({ error: error.error }))),
        );
      })
    );
  });

  updateProjectGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.updateProjectGroup),
      concatMap((action) => {
        return this.projectGroupService.update(action.projectGroup).pipe(
          map((projectGroup) => ProjectActions.updateProjectGroupSuccess({ projectGroup: action.projectGroup, returnUrl: action.returnUrl })),
          catchError((error: HttpErrorResponse) => of(ProjectActions.updateProjectGroupFailure({ error: error.error }))),
        );
      })
    );
  });

  deleteProjectGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.deleteProjectGroup),
      concatMap((action) => {
        return this.projectGroupService.delete(action.projectGroupId).pipe(
          map((projectGroup) => ProjectActions.deleteProjectGroupSuccess({ projectGroupId: action.projectGroupId })),
          catchError((error: HttpErrorResponse) => of(ProjectActions.deleteProjectGroupFailure({ error: error.error }))),
        );
      })
    );
  });

}
