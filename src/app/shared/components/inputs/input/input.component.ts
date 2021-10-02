import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'input[appInput]',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {

  @HostBinding()
  public readonly spellcheck = false;

  constructor(
    public readonly el: ElementRef<HTMLInputElement>,
  ) { }

  public focus(): void {
    this.el.nativeElement.focus();
  }

}
