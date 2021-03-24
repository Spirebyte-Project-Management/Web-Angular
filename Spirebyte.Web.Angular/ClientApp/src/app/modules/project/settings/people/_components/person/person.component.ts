import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/modules/auth/_models/user.model';

@Component({
  selector: 'tr[app-person]',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input() user: UserModel;
  @Input() owner = false;

  constructor() { }

  ngOnInit(): void {
  }

}
