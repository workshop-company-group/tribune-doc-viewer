import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-normal-button',
  templateUrl: './normal-button.component.html',
  styleUrls: ['./normal-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NormalButtonComponent {

  @Input()
  public readonly disabled = false;

  @Input()
  public readonly accent = false;

  @Output('button-click')
  public clickEmitter = new EventEmitter<void>();

  constructor() { }

}
