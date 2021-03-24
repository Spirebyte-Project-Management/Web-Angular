import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invitation-nav',
  templateUrl: './invitation-nav.component.html',
  styleUrls: ['./invitation-nav.component.scss']
})
export class InvitationNavComponent implements OnInit {

  @Input() userId: string;

  constructor() { }

  ngOnInit(): void {
  }

}
