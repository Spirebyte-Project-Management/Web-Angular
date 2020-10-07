import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserHTTPService } from '../_services/user-http.service';
import { UpdateModel } from '../_models/update.model';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../../auth/_services/auth.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {

  personalInfoForm: FormGroup;
  hasError: boolean;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder, private userHttpService: UserHTTPService, private authService: AuthService) { }

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
        id: [''],
        fullname: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ]
      });
    const getUserSubscr = this.authService.currentUserSubject.asObservable().subscribe(res => this.personalInfoForm.patchValue(res));
    this.unsubscribe.push(getUserSubscr);
    }

    submit() {
      this.hasError = false;
      const result = {};
      Object.keys(this.f).forEach(key => {
        result[key] = this.f[key].value;
      });
      const updateUser = new UpdateModel();
      updateUser.setUpdateModel(result);
      const updateUserSubscr = this.userHttpService
        .updateUser(updateUser)
        .pipe(first())
        .subscribe((user: UpdateModel) => {
          if (user) {
            this.authService.getUserByToken();
          } else {
            this.hasError = true;
          }
        });
      this.unsubscribe.push(updateUserSubscr);
    }

    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
