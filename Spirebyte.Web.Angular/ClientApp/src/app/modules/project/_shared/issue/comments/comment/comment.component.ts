import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/_models/user.model';
import { IssueCommentModel } from 'src/app/modules/data/_models/issue-comment.model';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: IssueCommentModel;

  author$: Observable<UserModel>;

  constructor(private userEntityService: UserEntityService) { }

  ngOnInit(): void {
    this.author$ = this.userEntityService.entities$.pipe(map(users => users.find(user => user.id == this.comment.authorId)));
  }
}
