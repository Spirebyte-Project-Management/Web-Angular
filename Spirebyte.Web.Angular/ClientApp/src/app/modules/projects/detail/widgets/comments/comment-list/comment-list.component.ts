import { Component, OnInit } from '@angular/core';
import * as InlineEditor from 'ckeditor5-build-inline-with-base64-image-upload';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  Editor = InlineEditor;

  constructor() { }

  ngOnInit(): void {
  }

}
