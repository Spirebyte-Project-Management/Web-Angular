import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ProjectHTTPService } from '../../data/_services/projects/project-http.service';

export const doesKeyExistValidator = 
  (projectHTTPService: ProjectHTTPService, time: number = 500) => {
    return (input: FormControl) => {
      return timer(time).pipe(
        switchMap(() => projectHTTPService.exist(input.value)),
        map(res => {
          return res ? {keyExist: true} : null
        })
      );
    };
  };