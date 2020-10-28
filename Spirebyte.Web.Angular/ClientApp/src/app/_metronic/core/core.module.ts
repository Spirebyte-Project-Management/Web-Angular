import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';

@NgModule({
  declarations: [FirstLetterPipe, SafePipe, EnumToArrayPipe],
  imports: [CommonModule],
  exports: [FirstLetterPipe, SafePipe, EnumToArrayPipe],
})
export class CoreModule {}
