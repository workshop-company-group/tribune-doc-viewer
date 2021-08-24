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
  public disabled = false;

  @Input()
  public accent = false;

  @Output('button-click')
  public readonly clickEmitter = new EventEmitter<void>();

  constructor() { }

}
