import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueModel, IssueType } from '../../_models/issue.model';
import { IssueHTTPService } from '../../_services/issue-http.service';
import { ProjectHTTPService } from '../../_services/project-http.service';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit, OnDestroy {
  types = IssueType;
  createIssueForm: FormGroup;
  hasError: boolean;
  projectKey: string;
  projectId: string;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder, private issueHttpService: IssueHTTPService,
              private projectHttpService: ProjectHTTPService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const paramsSubscription = this.route.parent.paramMap.subscribe( params => {
      this.projectKey = params.get('key');
      
      const projectSubscription = this.projectHttpService.getProject(this.projectKey).subscribe(res => this.projectId = res.id);
      this.unsubscribe.push(projectSubscription);
    });
    this.unsubscribe.push(paramsSubscription);

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
        description: []
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
      const createIssueSubscr = this.issueHttpService
        .createIssue(issue, this.projectId)
        .subscribe(
          result => {
            this.router.navigate(['']);
          },
          error => {
            this.hasError = true;
          },
          () => {
          }
        );
      this.unsubscribe.push(createIssueSubscr);
    }

    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

}

