import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

type RecordState = 'recording' | 'paused';

@Component({
  selector: 'app-record-controls',
  templateUrl: './record-controls.component.html',
  styleUrls: ['./record-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordControlsComponent {

  @Output('pause-click')
  public readonly pauseEmitter = new EventEmitter<void>();

  @Output('stop-click')
  public readonly stopEmitter = new EventEmitter<void>();

  @Input()
  public recordState: RecordState;

  public readonly pauseIcons: { [key in RecordState]: string } = {
    'recording': 'assets/icons/record/controls/pause.svg',
    'paused': 'assets/icons/record/controls/play.svg',
  }; // icon src depends on this.recordState

  constructor() { }

}
