import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { ProjectGroupEntityService } from 'src/app/modules/data/_services/projectGroups/projectGroup-entity.service';

@Component({
  selector: 'app-delete-projectgroup-confirmation-modal',
  templateUrl: './delete-projectgroup-confirmation-modal.component.html',
  styleUrls: ['./delete-projectgroup-confirmation-modal.component.scss']
})
export class DeleteProjectgroupConfirmationModalComponent implements OnInit {

  @Input() projectGroup: ProjectGroupModel;
  @Input() route: ActivatedRoute;

  private subscriptions: Subscription[] = [];

  constructor(public modal: NgbActiveModal, private router: Router, private projectGroupEntityService: ProjectGroupEntityService) { }

  ngOnInit(): void {
  }

  removeProjectGroup() {
    const sbDelete = this.projectGroupEntityService.delete(this.projectGroup).pipe(
      tap(() => {
        this.modal.close();
        this.router.navigate(['../'], {
          relativeTo: this.route,
        });
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.projectGroup);
      }),
    ).subscribe((res: ProjectGroupModel) => this.projectGroup = res);
    this.subscriptions.push(sbDelete);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
