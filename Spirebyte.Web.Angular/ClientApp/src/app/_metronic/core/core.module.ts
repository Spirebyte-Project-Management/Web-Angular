import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { DomChangedDirective } from './directives/dom-changed.directive';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { GroupByPipe } from './pipes/group-by.pipe';
import { RequirePermissionDirective } from './directives/require-permission.directive';
import { DataModule } from 'src/app/modules/data/data.module';
import { PermissionService } from './services/permission.service';
import { HasAPermissionDirective } from './directives/has-a-permission.directive';

@NgModule({
  declarations: [FirstLetterPipe, SafePipe, EnumToArrayPipe, DateAgoPipe, GroupByPipe, DomChangedDirective, RequirePermissionDirective, HasAPermissionDirective],
  imports: [CommonModule, DataModule],
  providers: [PermissionService],
  exports: [FirstLetterPipe, SafePipe, EnumToArrayPipe, DateAgoPipe, GroupByPipe, DomChangedDirective, RequirePermissionDirective, HasAPermissionDirective],
})
export class CoreModule {}
