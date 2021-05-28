import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import * as AuthActions from '../../../_store/auth/auth.actions'
import { Store } from '@ngrx/store';
import { authHasError, getAuthError, isAuthenticated } from 'src/app/_store/auth/auth.selectors';
import { RegisterModel } from 'src/app/_models/register.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  
  hasError: boolean;
  isLoading$: Observable<boolean>;

  hasError$: Observable<boolean>;
  error$: Observable<any>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.hasError$ = this.store.select(authHasError);
    this.error$ = this.store.select(getAuthError);
    // redirect to home if already logged in
    this.unsubscribe.push(this.store.select(isAuthenticated).subscribe(res => {
      if (res) {
        this.router.navigate(['/']);
      }
    }));
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        fullname: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        agree: [false, Validators.compose([Validators.required])],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  submit() {
    const registerModel = new RegisterModel();
    registerModel.setRegisterModel(this.registrationForm.value);
    this.store.dispatch(AuthActions.registerStart({ registerModel }));
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
