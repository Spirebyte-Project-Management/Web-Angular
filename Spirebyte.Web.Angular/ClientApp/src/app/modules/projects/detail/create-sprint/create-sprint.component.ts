import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SprintModel } from '../../_models/Sprint.model';
import { ProjectHTTPService } from '../../_services/project-http.service';
import { SprintHTTPService } from '../../_services/sprint-http.service';

@Component({
  selector: 'app-create-sprint',
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.scss']
})
export class CreateSprintComponent implements OnInit, OnDestroy {
  createSprintForm: FormGroup;
  hasError: boolean;
  projectKey: string;
  projectId: string;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder, private sprintHttpService: SprintHTTPService,
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
    return this.createSprintForm.controls;
  }

  initForm() {
    this.createSprintForm = this.fb.group(
      {
        title: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        description: [''],
        startDate: [
          undefined,
          Validators.compose([
            Validators.required
          ])
        ],
        endDate: [
          undefined,
          Validators.compose([
            Validators.required
          ])
        ],
      });
    }

    submit() {
      this.hasError = false;
      const result = {};
      Object.keys(this.f).forEach(key => {
        result[key] = this.f[key].value;
      });
      const sprint = new SprintModel();
      sprint.setSprint(result);
      const createSprintSubscr = this.sprintHttpService
        .createSprint(sprint, this.projectId)
        .subscribe(
          result => {
            this.router.navigate(['../backlog'],
            {relativeTo: this.route});
          },
          error => {
            this.hasError = true;
          },
          () => {
          }
        );
      this.unsubscribe.push(createSprintSubscr);
    }

    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

}
