import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { PermissionSchemeModel } from 'src/app/modules/data/_models/permission-scheme.model';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { PermissionSchemeEntityService } from 'src/app/modules/data/_services/permission-scheme/permission-scheme-entity.service';
import { ProjectEntityService } from 'src/app/modules/data/_services/projects/project-entity.service';

@Component({
  selector: 'app-revert-to-default-modal',
  templateUrl: './revert-to-default-modal.component.html',
  styleUrls: ['./revert-to-default-modal.component.scss']
})
export class RevertToDefaultModalComponent implements OnInit {

  @Input() permissionScheme: PermissionSchemeModel;

  private subscriptions: Subscription[] = [];

  constructor(public modal: NgbActiveModal, private permissionSchemeEntityService: PermissionSchemeEntityService, private projectEntityService: ProjectEntityService) { }

  ngOnInit(): void {
  }

  revert() {
    const sbUpdate = this.permissionSchemeEntityService.delete(this.permissionScheme.id).pipe(
      tap(() => {
        this.modal.close();
      }),
    ).subscribe(() => this.projectEntityService.getByKey(this.permissionScheme.projectId));
    this.subscriptions.push(sbUpdate);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
