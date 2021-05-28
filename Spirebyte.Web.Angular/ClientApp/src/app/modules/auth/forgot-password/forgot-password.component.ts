import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as AuthActions from '../../../_store/auth/auth.actions'
import { Store } from '@ngrx/store';
import { authHasError, getAuthError, isAuthLoading, isForgotPasswordSent } from 'src/app/_store/auth/auth.selectors';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  hasError$: Observable<boolean>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;
  isForgotPasswordSent$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.isLoading$ = this.store.select(isAuthLoading);
    this.hasError$ = this.store.select(authHasError);
    this.error$ = this.store.select(getAuthError);
    this.isForgotPasswordSent$ = this.store.select(isForgotPasswordSent);
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [
        'admin@demo.com',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
    });
  }

  submit() {
    this.store.dispatch(AuthActions.forgotPasswordStart({ email: this.f.email.value }));
  }
}
