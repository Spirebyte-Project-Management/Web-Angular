import { ElementRef, ViewChild } from '@angular/core';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/_models/user.model';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { ProjectGroupEntityService } from 'src/app/modules/data/_services/projectGroups/projectGroup-entity.service';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProjectGroupsTagInputComponent),
  multi: true
};

@Component({
  selector: 'app-project-groups-tag-input',
  templateUrl: './project-groups-tag-input.component.html',
  styleUrls: ['./project-groups-tag-input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class ProjectGroupsTagInputComponent implements OnInit, ControlValueAccessor {

  @Input() allIds: string[] = [];
  @Input() multiple = true;
  
  projectGroupsIds: string[];
  disabled = false;
  projectGroups$: Observable<ProjectGroupModel[]>;

  @ViewChild('input')  inputRef: ElementRef; 

  constructor(private projectGroupEntityService: ProjectGroupEntityService, private userEntityService: UserEntityService) { }

  propagateChange = (_: any) => { }

  // event fired when input value is changed . later propagated up to the form control using the custom value accessor interface
  onChange(projectGroups: ProjectGroupModel[]){
    let ids = projectGroups.map(a => a.id);
    //set changed value
    this.projectGroupsIds = ids;
    // propagate value into form control using control value accessor interface
    this.propagateChange(this.projectGroupsIds);
  }

  //get accessor
  get value(): any {
      return this.projectGroupsIds;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
      if (v !== this.projectGroupsIds) {
          this.projectGroupsIds = v;
      }
  }

  writeValue(obj: any): void {
    this.projectGroupsIds = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getUsersByIds(userIds: string[]): Observable<UserModel[]> {
    return this.userEntityService.entities$.pipe(map(users => users.filter(user => userIds.includes(user.id))));
  }

  ngOnInit(): void {
    this.projectGroups$ = this.projectGroupEntityService.entities$.pipe(map(projectGroups => projectGroups.filter(projectGroup => this.allIds.length > 0 ? this.allIds.includes(projectGroup.id) : true)));
  }
}
