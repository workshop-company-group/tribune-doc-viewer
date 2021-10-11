import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackdropComponent {

  @Input()
  @HostBinding('class.opened')
  public opened = false;

  constructor() { }

}
