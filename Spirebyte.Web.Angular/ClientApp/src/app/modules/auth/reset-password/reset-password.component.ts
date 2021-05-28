import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ConfirmPasswordValidator } from '../registration/confirm-password.validator';
import * as AuthActions from '../../../_store/auth/auth.actions'
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { authHasError, getAuthError, isPasswordReset } from 'src/app/_store/auth/auth.selectors';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-reset-passowrd',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  resetPasswordForm: FormGroup;
  userId: string;
  token: string;

  isPasswordReset$: Observable<boolean>;
  hasError$: Observable<boolean>;
  error$: Observable<any>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.hasError$ = this.store.select(authHasError);
    this.error$ = this.store.select(getAuthError);
    this.isPasswordReset$ = this.store.select(isPasswordReset);
  }

  ngOnInit(): void {
    const paramsSubscription =   this.route.queryParamMap.subscribe( params => {
      this.userId = params.get('userId');
      this.token = params.get('token');
    });
    this.unsubscribe.push(paramsSubscription);

    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetPasswordForm.controls;
  }

  initForm() {
    this.resetPasswordForm = this.fb.group({
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
    },
    {
      validator: ConfirmPasswordValidator.MatchPassword,
    });
  }

  submit() {
    this.store.dispatch(AuthActions.resetPasswordStart({ userId: this.userId, token: this.token, password: this.f.password.value }));
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
