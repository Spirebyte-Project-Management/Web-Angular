import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarFileUploadComponent } from './avatar-file-upload.component';

describe('AvatarFileUploadComponent', () => {
  let component: AvatarFileUploadComponent;
  let fixture: ComponentFixture<AvatarFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
