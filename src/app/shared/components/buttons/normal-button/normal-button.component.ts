import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'button[appNormalButton]',
  templateUrl: './normal-button.component.html',
  styleUrls: ['./normal-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NormalButtonComponent {

  @Input()
  @HostBinding('class.accent')
  public accent = false;

  constructor(
    public readonly el: ElementRef<HTMLButtonElement>,
  ) { }

  public click(): void {
    this.el.nativeElement.click();
  }

}
