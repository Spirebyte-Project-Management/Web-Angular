import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { IssueType, IssueModel } from 'src/app/modules/data/_models/issue.model';
import { IssueEntityService } from 'src/app/modules/data/_services/issues/issue-entity.service';


@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit, OnDestroy {
  Editor = InlineEditor;

  types = IssueType;
  createIssueForm: FormGroup;
  hasError: boolean;
  projectId: string;
  returnUrl: string;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder, 
              private issueEntityService: IssueEntityService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const paramsSubscription = this.route.parent.paramMap.subscribe( params => {
      this.projectId = params.get('key');
    });
    this.unsubscribe.push(paramsSubscription);

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '../';

    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.createIssueForm.controls;
  }

  initForm() {
    this.createIssueForm = this.fb.group(
      {
        type: [
          0,
          Validators.compose([
            Validators.required,
          ]),
        ],
        title: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        description: ['']
      });
    }

    submit() {
      this.hasError = false;
      const result = {};
      Object.keys(this.f).forEach(key => {
        result[key] = this.f[key].value;
      });
      const issue = new IssueModel();
      issue.setIssue(result);
      issue.projectId = this.projectId;
      const createIssueSubscr = this.issueEntityService
        .add(issue)
        .subscribe(
          () => {
            this.router.navigateByUrl(this.returnUrl,
            /* Removed unsupported properties by Angular migration: relativeTo. */ {});
          }
        );
      this.unsubscribe.push(createIssueSubscr);
    }

    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

}

