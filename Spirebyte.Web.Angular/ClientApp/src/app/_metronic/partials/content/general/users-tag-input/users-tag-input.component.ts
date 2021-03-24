import { ElementRef, ViewChild } from '@angular/core';
import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UsersTagInputComponent),
  multi: true
};

@Component({
  selector: 'app-users-tag-input',
  templateUrl: './users-tag-input.component.html',
  styleUrls: ['./users-tag-input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class UsersTagInputComponent implements OnInit, ControlValueAccessor {

  @Input() allIds: string[] = [];
  @Input() multiple = true;
  
  userIds: string[];
  disabled = false;
  users$: Observable<UserModel[]>;

  @ViewChild('input')  inputRef: ElementRef; 

  constructor(private userEntityService: UserEntityService) { }

  propagateChange = (_: any) => { }

  // event fired when input value is changed . later propagated up to the form control using the custom value accessor interface
  onChange(users: UserModel[]){
    let ids = users.map(a => a.id);
    //set changed value
    this.userIds = ids;
    // propagate value into form control using control value accessor interface
    this.propagateChange(this.userIds);
  }

  //get accessor
  get value(): any {
      return this.userIds;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
      if (v !== this.userIds) {
          this.userIds = v;
      }
  }

  writeValue(obj: any): void {
    this.userIds = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
    this.users$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => this.allIds.length > 0 ? this.allIds.includes(user.id) : true)));
  }
}
