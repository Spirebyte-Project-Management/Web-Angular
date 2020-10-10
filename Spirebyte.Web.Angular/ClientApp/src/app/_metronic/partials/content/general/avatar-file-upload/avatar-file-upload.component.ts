import { Component,  AfterViewInit, ElementRef, Input, HostListener } from '@angular/core';
import KTImageInput from '../../../../../../assets/js/components/image-input.js';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-avatar-file-upload',
  templateUrl: './avatar-file-upload.component.html',
  styleUrls: ['./avatar-file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AvatarFileUploadComponent,
      multi: true
    }
  ]
})
export class AvatarFileUploadComponent implements AfterViewInit, ControlValueAccessor {

  @Input() currentPicture;
  @Input() defaultPicture;

  private fileUploadComponent: any;
  private file: File | null = null;
  onChange: Function;

  constructor(private host: ElementRef<HTMLInputElement> ) { }

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  ngAfterViewInit() {
    this.fileUploadComponent = new KTImageInput('kt_profile_avatar');
  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }
}
