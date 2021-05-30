import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { Store } from '@ngrx/store';
import { IssueType, IssueModel } from '../../_models/issue.model';
import { createIssue } from '../../_store/issue.actions';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


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
  @Input() projectId: string;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder, 
              private store: Store,
              public modal: NgbActiveModal,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
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

    create() {
      this.hasError = false;
      const result = {};
      Object.keys(this.f).forEach(key => {
        result[key] = this.f[key].value;
      });
      const issue = new IssueModel();
      issue.setIssue(result);
      console.log(this.projectId)
      issue.projectId = this.projectId;
      this.store.dispatch(createIssue({ issue }));
      this.modal.close();
    }

    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

}

