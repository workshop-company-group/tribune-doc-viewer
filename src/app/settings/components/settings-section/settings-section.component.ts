import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-settings-section',
  templateUrl: './settings-section.component.html',
  styleUrls: ['./settings-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSectionComponent {

  @Input()
  public title: string;

  constructor() { }

}
