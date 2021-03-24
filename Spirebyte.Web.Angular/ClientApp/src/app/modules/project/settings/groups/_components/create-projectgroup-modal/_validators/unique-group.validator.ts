import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';

export function uniqueProjectGroup(projectGroups: Observable<ProjectGroupModel[]>): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return projectGroups.pipe(
            first(),
            map(res => {
            let names = res.map(projectGroup => projectGroup.name)
            let hasName = names.includes(control.value as string);
            return hasName ? { "uniqueProjectGroup": true } as ValidationErrors : null
        }));
    };
};