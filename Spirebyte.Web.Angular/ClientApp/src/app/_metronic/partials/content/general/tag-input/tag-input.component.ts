import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import * as Tagify from '@yaireo/tagify';
import { SettingsModel } from './_models/settings.model';
import { thistle } from 'color-name';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TagInputComponent,
      multi: true
    }
  ]
})
export class TagInputComponent implements AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  @Output() add = new EventEmitter(); // returns the added tag + updated tags list
  @Output() remove = new EventEmitter(); // returns the updated tags list

  @Input() settings: SettingsModel; // get possible tagify settings
  @Input() value: string | Array<string>;
  @Input() editOnly: boolean = false;
  @Input() typeaheadUrl: string = null;
  @Input() typeaheadFunc: (searchTerm: string) => Observable<any[]>;

  @ViewChild('tagifyInputRef') tagifyInputRef: any;

  private onChange: Function;
  private tagify;

  constructor() { }

  ngAfterViewInit() {
    if (!this.settings) {
      return;
    }
    this.settings.callbacks = {
      add: () => this.add.emit({
        tags: this.tagify.value,
        added: this.tagify.value[this.tagify.value.length - 1]
      }),
      remove: () => this.remove.emit(this.tagify.value)
    };
    this.tagify = new Tagify(this.tagifyInputRef.nativeElement, this.settings);

    this.tagify.on('change', (event) => this.onChange(JSON.parse(event.detail.value)));
    if (this.typeaheadUrl != null) {
      this.tagify.on('input', (event) => this.searchUsers(event.detail.value));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.tagify) { return; }
    if (!changes.previousValue) {
      this.tagify.loadOriginalValues(changes.currentValue);
      this.onChange(changes.currentValue);
    }
  }

    /**
   * @description removes all tags
   */
  removeAll() {
    this.tagify.removeAllTags();
  }

  /**
   * @description add multiple tags
   */
  addTags(tags) {
    this.tagify.addTags(tags);
  }

  searchUsers(event: any) {
    this.tagify.settings.whitelist.length = 0;
    this.tagify.loading(true).dropdown.hide.call(this.tagify);
    this.typeaheadFunc(event).subscribe(result => {
      this.tagify.settings.whitelist.push(...result, ...this.tagify.value);

      this.tagify.loading(false).dropdown.show.call(this.tagify);
    });
  }

  /**
   * @description destroy dom and everything
   */
  ngOnDestroy() {
    this.tagify.destroy();
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
  }

}
