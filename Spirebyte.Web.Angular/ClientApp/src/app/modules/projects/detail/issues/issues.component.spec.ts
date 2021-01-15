import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { ProjectModule } from '../../project.module';
import { IssueEntityService } from '../../_services/issues/issue-entity.service';

import { IssuesComponent } from './issues.component';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule],
      providers: [IssueEntityService],
      declarations: [ IssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
