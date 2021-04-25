import { Component, forwardRef, Input, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {

  @Input()
  public placeholder: string = '';

  public disabled: boolean = false;

  public value: string = '';

  public changeHandler: Function = () => {};

  public touchHandler: Function = () => {};

  constructor() { }

  public writeValue(obj: string): void {
    this.value = obj;
  }

  public registerOnChange(fn: Function): void {
    this.changeHandler = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.touchHandler = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
