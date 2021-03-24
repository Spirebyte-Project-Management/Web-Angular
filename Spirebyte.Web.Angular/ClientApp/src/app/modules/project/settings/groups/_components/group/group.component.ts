import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/modules/auth/_models/user.model';
import { ProjectGroupModel } from 'src/app/modules/data/_models/projectGroup.model';
import { UserEntityService } from 'src/app/modules/data/_services/users/user-entity.service';

@Component({
  selector: 'tr[app-group]',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input() projectGroup: ProjectGroupModel;

  projectGroupUsers$: Observable<UserModel[]>

  constructor(private userEntityService: UserEntityService) { }

  ngOnInit(): void {
    this.projectGroupUsers$ = this.userEntityService.entities$.pipe(map(users => users.filter(user => this.projectGroup.userIds.includes(user.id))));
  }
}
