import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackdropComponent {

  @Input()
  public opened = false;

  constructor() { }

}
