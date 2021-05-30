import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  
  @Input() projectId: string;

  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder, 
              private sprintEntityService: SprintEntityService,
              public modal: NgbActiveModal) { }

  ngOnInit(): void {
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

    create() {
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
            this.modal.close();
          }
        );
      this.unsubscribe.push(createSprintSubscr);
    }

    ngOnDestroy() {
      this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

}
