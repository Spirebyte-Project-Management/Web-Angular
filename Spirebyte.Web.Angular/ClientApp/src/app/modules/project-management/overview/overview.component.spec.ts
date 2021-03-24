import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { convertToParamMap, Routes, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { AuthService } from '../../auth/_services/auth.service';
import { ProjectResolver } from '../../data/_services/projects/project.resolver';
import { CreateComponent } from '../create/create.component';
import { ProjectManagementModule } from '../project-management.module';
import { UpdateComponent } from '../update/update.component';

import { OverviewComponent } from './overview.component';



const fakeRoutes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent,
    resolve: {
      projects: ProjectResolver
    },
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: ':key/update',
    component: UpdateComponent
  },
  {path: '', redirectTo: 'overview', pathMatch: 'full'},
  {path: '**', redirectTo: 'overview', pathMatch: 'full'},
];

const FakeAuthService = {
  currentUserValue: {
    id: 'test'
  }
}

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot(fakeRoutes, { relativeLinkResolution: 'legacy' }), ProjectManagementModule, AppModule],
      declarations: [ OverviewComponent ],
      providers: [
        {
          provide: AuthService,
          useValue: FakeAuthService,
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
