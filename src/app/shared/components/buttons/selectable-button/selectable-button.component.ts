import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-selectable-button',
  templateUrl: './selectable-button.component.html',
  styleUrls: ['./selectable-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectableButtonComponent {

  @Input()
  public selected = false;

  @Output('button-click')
  public readonly clickEmitter = new EventEmitter<void>();

  constructor() { }

}
