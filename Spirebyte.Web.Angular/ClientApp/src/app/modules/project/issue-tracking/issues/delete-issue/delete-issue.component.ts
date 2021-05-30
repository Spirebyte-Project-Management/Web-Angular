import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { deleteIssue } from '../../_store/issue.actions';

@Component({
  selector: 'app-delete-issue',
  templateUrl: './delete-issue.component.html',
  styleUrls: ['./delete-issue.component.scss']
})
export class DeleteIssueComponent {

  @Input() issueId: string;

  constructor(private store: Store,
      public modal: NgbActiveModal) {
  }

  delete(): void {
    this.store.dispatch(deleteIssue({ issueId: this.issueId }));
    this.modal.close();
  }
}
