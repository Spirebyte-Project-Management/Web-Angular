import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserEntityService } from '../../data/_services/users/user-entity.service';
import { Store } from '@ngrx/store';
import { getAuthenticatedUser } from 'src/app/_store/auth/auth.selectors';
import * as ProjectActions from '../_store/project.actions';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {
  
  userId: string;

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private userEntityService: UserEntityService, private route: ActivatedRoute, private router: Router, private store: Store) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId');
    });

  }

  joinProject() {
    this.isLoadingSubject.next(true);
    
    this.store.dispatch(ProjectActions.joinProject({ userId: this.userId }))
  }

  leaveProject() {
    this.isLoadingSubject.next(true);
    this.store.dispatch(ProjectActions.leaveProject({ userId: this.userId }))

  }
}
