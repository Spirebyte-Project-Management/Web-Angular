import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ProjectService } from '../../../project/_services/project.service';

export const doesKeyExistValidator = 
  (projectService: ProjectService, time: number = 500) => {
    return (input: FormControl) => {
      return timer(time).pipe(
        switchMap(() => projectService.exist(input.value)),
        map(res => {
          return res ? {keyExist: true} : null
        })
      );
    };
  };