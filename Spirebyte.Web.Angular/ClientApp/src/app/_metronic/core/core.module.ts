import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { DomChangedDirective } from './directives/dom-changed.directive';
import { DateAgoPipe } from './pipes/date-ago.pipe';

@NgModule({
  declarations: [FirstLetterPipe, SafePipe, EnumToArrayPipe, DateAgoPipe, DomChangedDirective],
  imports: [CommonModule],
  exports: [FirstLetterPipe, SafePipe, EnumToArrayPipe, DateAgoPipe, DomChangedDirective],
})
export class CoreModule {}
