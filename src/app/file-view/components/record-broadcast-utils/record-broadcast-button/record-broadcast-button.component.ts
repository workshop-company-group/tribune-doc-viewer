import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-record-broadcast-button',
  templateUrl: './record-broadcast-button.component.html',
  styleUrls: ['./record-broadcast-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordBroadcastButtonComponent {

  @Input()
  public disabled = false;

  @Input()
  public iconSrc: string;

  @Output('button-click')
  public readonly clickEmitter = new EventEmitter<void>();

  constructor() { }

}
