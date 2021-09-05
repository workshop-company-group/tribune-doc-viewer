import {
  ChangeDetectionStrategy,
  Component,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-small-button',
  templateUrl: './small-button.component.html',
  styleUrls: ['./small-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallButtonComponent {

  @Input()
  public disabled = false;

  @Input()
  public accent = false;

  @Output('button-click')
  public readonly clickEmitter = new EventEmitter<void>();

  constructor() { }

}
