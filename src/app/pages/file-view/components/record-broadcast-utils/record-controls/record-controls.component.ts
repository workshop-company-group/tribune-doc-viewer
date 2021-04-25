import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-record-controls',
  templateUrl: './record-controls.component.html',
  styleUrls: ['./record-controls.component.scss']
})
export class RecordControlsComponent {

  @Output('pause-click')
  public readonly pauseEmitter = new EventEmitter<void>();

  @Output('stop-click')
  public readonly stopEmitter = new EventEmitter<void>();

  @Input()
  public readonly recordState: 'recording' | 'paused';

  public readonly pauseIcons = {
    'recording': 'assets/icons/record/controls/pause.svg',
    'paused': 'assets/icons/record/controls/play.svg',
  }; // icon src depends on this.recordState

  constructor() { }

}
