import { Component, OnInit } from '@angular/core';
import * as InlineEditor from 'ckeditor5-build-inline-with-base64-image-upload';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {

  Editor = InlineEditor;


  constructor() { }

  ngOnInit(): void {
  }

}
