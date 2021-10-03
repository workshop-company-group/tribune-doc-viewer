import { Directive, HostBinding, Input } from '@angular/core';
import { TextButtonComponent } from '../components';

@Directive({
  selector: 'button[appTextButton][appSelectableButton]',
})
export class SelectableButtonDirective {

  constructor(
    private readonly c: TextButtonComponent,
  ) {
  }

  @Input()
  public set selected(value: boolean) {
    this.c.accent = value;
  }

  @HostBinding('class')
  public readonly selectableButtonClass = 'selectable-button';

}
