import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SprintModel } from 'src/app/modules/data/_models/sprint.model';
import { SprintEntityService } from 'src/app/modules/data/_services/sprints/sprint-entity.service';

@Component({
  selector: 'app-create-sprint',
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.scss']
})
export class CreateSprintComponent implements OnInit, OnDestroy {
  createSprintForm: FormGroup;
  hasError: boolean;
  projectId: string;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder, 
              private sprintEntityService: SprintEntityService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const paramsSubscription = this.route.parent.paramMap.subscribe( params => {
      this.projectId = params.get('key');
      console.log(this.projectId)
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
      sprint.createSprint(result);
      sprint.projectId = this.projectId;
      const createSprintSubscr = this.sprintEntityService
        .add(sprint)
        .subscribe(
          () => {
            this.router.navigate(['../../backlog'],
            {relativeTo: this.route});
          }
        );
      this.unsubscribe.push(createSprintSubscr);
    }

    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

}
