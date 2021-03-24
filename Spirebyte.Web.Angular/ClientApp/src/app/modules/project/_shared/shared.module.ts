import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './issue/comments/comment/comment.component';
import { CommentListComponent } from './issue/comments/comment-list/comment-list.component';
import { PostCommentComponent } from './issue/comments/post-comment/post-comment.component';
import { HistoryItemComponent } from './issue/history/history-item/history-item.component';
import { HistoryListComponent } from './issue/history/history-list/history-list.component';
import { SubIssueComponent } from './issue/sub-issue/sub-issue.component';
import { GeneralModule } from 'src/app/_metronic/partials/content/general/general.module';
import { EpicLabelComponent } from './issue/epic-label/epic-label.component';
import { CoreModule } from 'src/app/_metronic/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CommentComponent, CommentListComponent, PostCommentComponent, HistoryItemComponent, HistoryListComponent, SubIssueComponent, EpicLabelComponent],
  imports: [
    CommonModule,
    CoreModule,
    NgbTooltipModule,
    CKEditorModule,
    GeneralModule,
    FormsModule
  ],
  exports: [CommentComponent, CommentListComponent, PostCommentComponent, HistoryItemComponent, HistoryListComponent, SubIssueComponent, EpicLabelComponent]
})
export class SharedModule { }
