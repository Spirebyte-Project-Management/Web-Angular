import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-epic-id-template',
  templateUrl: './history-epic-id-template.component.html',
  styleUrls: ['./history-epic-id-template.component.scss']
})
export class HistoryEpicIdTemplateComponent implements OnInit {
  @Input() value: string;
  constructor() { }

  ngOnInit(): void {
  }

}
