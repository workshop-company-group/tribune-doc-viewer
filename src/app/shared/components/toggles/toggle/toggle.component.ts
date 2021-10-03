import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent implements ControlValueAccessor {

  @HostBinding('class.activated')
  public value = false;

  public changeHandler: (obj: boolean) => void;

  public touchedHandler: () => void;

  constructor() { }

  @HostListener('click')
  public toggleValue(): void {
    this.value = !this.value;
    this.changeHandler(this.value);
    this.touchedHandler();
  }

  public writeValue(obj: boolean): void {
    this.value = obj;
  }

  public registerOnChange(fn: (obj: boolean) => void): void {
    this.changeHandler = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touchedHandler = fn;
  }

}
