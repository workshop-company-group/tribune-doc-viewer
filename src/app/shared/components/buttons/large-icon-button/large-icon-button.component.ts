import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-large-icon-button',
  templateUrl: './large-icon-button.component.html',
  styleUrls: ['./large-icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LargeIconButtonComponent {

  @Input()
  public iconSrc: string;

  @Output('button-click')
  public readonly clickEmitter = new EventEmitter<void>();

  constructor() { }

}
