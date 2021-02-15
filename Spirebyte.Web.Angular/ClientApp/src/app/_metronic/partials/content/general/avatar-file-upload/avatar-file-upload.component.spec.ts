import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvatarFileUploadComponent } from './avatar-file-upload.component';

describe('AvatarFileUploadComponent', () => {
  let component: AvatarFileUploadComponent;
  let fixture: ComponentFixture<AvatarFileUploadComponent>;

  beforeEach(waitForAsync(() => {
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
