import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl,
  NG_VALUE_ACCESSOR } from '@angular/forms';

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
  public placeholder = '';

  public readonly inputControl = new FormControl('');

  @Input()
  public set disabled(value: boolean) {
    value ?
      this.inputControl.disable() :
      this.inputControl.enable();
  }

  public changeHandler: Function = () => {
    // empty
  };

  public touchedHandler: Function = () => {
    // empty
  };

  constructor() { }

  public writeValue(obj: string): void {
    this.inputControl.setValue(obj, { emitEvent: false });
  }

  public registerOnChange(fn: Function): void {
    this.changeHandler = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.touchedHandler = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
