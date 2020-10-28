import { ProjectHTTPService } from '../_services/project-http.service';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export const doesKeyExistValidator = 
  (projectHTTPService: ProjectHTTPService, time: number = 500) => {
    return (input: FormControl) => {
      return timer(time).pipe(
        switchMap(() => projectHTTPService.doesKeyExist(input.value)),
        map(res => {
          return res ? {keyExist: true} : null
        })
      );
    };
  };