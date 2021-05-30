import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-string-template',
  templateUrl: './history-string-template.component.html',
  styleUrls: ['./history-string-template.component.scss']
})
export class HistoryStringTemplateComponent {
  @Input() value: string;
}
