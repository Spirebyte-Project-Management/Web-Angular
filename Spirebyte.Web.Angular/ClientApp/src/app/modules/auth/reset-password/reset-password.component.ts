import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { ConfirmPasswordValidator } from '../registration/confirm-password.validator';
import { first } from 'rxjs/operators';
import { thistle } from 'color-name';
import { ActivatedRoute } from '@angular/router';

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
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;
  userId: string;
  token: string;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    const paramsSubscription =   this.route.queryParamMap.subscribe( params => {
      this.userId = params.get('userId');
      this.token = params.get('token');
      console.log(this.userId);
      console.log(this.token);
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
    this.errorState = ErrorStates.NotSubmitted;
    const forgotPasswordSubscr = this.authService
      .resetPassword(this.userId, this.token, this.f.password.value)
      .pipe(first())
      .subscribe(
        result => {
          this.errorState = ErrorStates.NoError;
        },
        error => {
          this.errorState = ErrorStates.HasError;
        },
        () => {
        }
      );
    this.unsubscribe.push(forgotPasswordSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
