import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'button[appTextButton]',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextButtonComponent {

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
