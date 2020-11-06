import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectHTTPService } from '../_services/project-http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  key: string;
  userId: string;

  private isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private projectHttpService: ProjectHTTPService, private route: ActivatedRoute, private router: Router) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnInit(): void {
    this.route.parent.paramMap.subscribe((params) => {
      this.key = params.get('key');
    });
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId');
    });
  }

  joinProject() {
    this.isLoadingSubject.next(true);
    this.projectHttpService.joinProject(this.key, this.userId).subscribe((result) => {
      this.router.navigate(['../']);
    });
  }

  leaveProject() {
    this.isLoadingSubject.next(true);
    this.projectHttpService.joinProject(this.key, this.userId).subscribe((result) => {
      this.router.navigate(['../']);
    });
  }

}
