import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ProjectGroupModel } from 'src/app/modules/project/_models/projectGroup.model';
import * as ProjectActions from '../../../../../_store/project.actions';

@Component({
  selector: 'app-delete-projectgroup-confirmation-modal',
  templateUrl: './delete-projectgroup-confirmation-modal.component.html',
  styleUrls: ['./delete-projectgroup-confirmation-modal.component.scss']
})
export class DeleteProjectgroupConfirmationModalComponent implements OnInit {

  @Input() projectGroup: ProjectGroupModel;
  @Input() route: ActivatedRoute;

  constructor(public modal: NgbActiveModal, private router: Router, private store: Store) { }

  ngOnInit(): void {
  }

  removeProjectGroup() {
    this.store.dispatch(ProjectActions.deleteProjectGroup({ projectGroupId: this.projectGroup.id}))
    this.modal.close();
    this.router.navigate(['../'], {
      relativeTo: this.route,
    });
  }
}
