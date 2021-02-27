import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-record-broadcast-button',
  templateUrl: './record-broadcast-button.component.html',
  styleUrls: ['./record-broadcast-button.component.scss']
})
export class RecordBroadcastButtonComponent {

  @Input()
  public readonly disabled: boolean = false;

  @Input('icon')
  public readonly iconSrc: string;

  @Output('button-click')
  public readonly clickEmitter = new EventEmitter<void>();

  constructor() { }

}
