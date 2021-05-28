import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/_models/user.model';
import { Store } from '@ngrx/store';
import { getAuthenticatedUser } from 'src/app/_store/auth/auth.selectors';
import * as UserActions from '../../../_store/user/user.actions';
import { ProfileModel } from 'src/app/_models/updateProfile.model';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {

  personalInfoForm: FormGroup;
  hasError: boolean;
  currentUser: UserModel;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.personalInfoForm.controls;
  }

  initForm() {
    this.personalInfoForm = this.fb.group(
      {
        fullname: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        file: []
      });
    const getUserSubscr = this.store.select(getAuthenticatedUser).subscribe(res => {
      this.personalInfoForm.patchValue(res);
      this.currentUser = res;
    });
    this.unsubscribe.push(getUserSubscr);
    }

    submit() {
      const updateProfile = new ProfileModel();
      updateProfile.setProfile(this.personalInfoForm.value);
      this.store.dispatch(UserActions.updateProfile({ profile: updateProfile}));
    }

    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
