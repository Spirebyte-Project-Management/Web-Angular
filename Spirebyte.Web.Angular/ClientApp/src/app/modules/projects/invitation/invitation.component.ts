import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectHTTPService } from '../_services/projects/project-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserEntityService } from '../_services/users/user-entity.service';
import { environment } from '../../../../environments/environment';
import { UserModel } from '../../auth/_models/user.model';
import { AuthService } from '../../auth/_services/auth.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  
  projectId: string;
  userId: string;

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private projectHttpService: ProjectHTTPService, private userEntityService: UserEntityService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe((params) => {
      this.projectId = params.get('key');
    });
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId');
    });

  }

  joinProject() {
    this.isLoadingSubject.next(true);
    this.projectHttpService.joinProject(this.projectId, this.userId).subscribe((result) => {
      let user = this.authService.currentUserValue;
      this.userEntityService.addOneToCache(user);
      this.router.navigate(['../backlog']);
    });
  }

  leaveProject() {
    this.isLoadingSubject.next(true);
    this.projectHttpService.joinProject(this.projectId, this.userId).subscribe((result) => {
      this.router.navigate(['../']);
    });
  }

}
