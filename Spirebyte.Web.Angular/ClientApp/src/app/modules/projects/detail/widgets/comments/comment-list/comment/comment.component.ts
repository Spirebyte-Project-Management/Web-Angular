import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { CommentModel } from 'src/app/modules/projects/_models/comment.model';
import { UserEntityService } from 'src/app/modules/projects/_services/users/user-entity.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: CommentModel;

  author$: Observable<UserModel>;

  constructor(private userEntityService: UserEntityService) { }

  ngOnInit(): void {
    this.author$ = this.userEntityService.entities$.pipe(map(users => users.find(user => user.id == this.comment.authorId)));
  }
}
