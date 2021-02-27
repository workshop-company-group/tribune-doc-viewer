import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-record-button',
  templateUrl: './record-button.component.html',
  styleUrls: ['./record-button.component.scss']
})
export class RecordButtonComponent {

  @Input()
  public readonly disabled: boolean = false;

  @Output('buttonClick')
  public readonly clickEmitter = new EventEmitter<void>();

  constructor() { }

}
