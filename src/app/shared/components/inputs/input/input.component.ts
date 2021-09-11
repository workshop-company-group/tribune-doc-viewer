import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {

  @Input()
  public placeholder = '';

  public readonly inputControl = new FormControl('');

  @Output('enter')
  public readonly enterEmitter = new EventEmitter<void>();

  @Input()
  public set disabled(value: boolean) {
    if (value) {
      this.inputControl.disable();
    } else {
      this.inputControl.enable();
    }
  }

  public changeHandler: (obj: string) => void = () => {
    // empty
  };

  public touchedHandler: () => void = () => {
    // empty
  };

  constructor() { }

  public writeValue(obj: string): void {
    this.inputControl.setValue(obj, { emitEvent: false });
  }

  public registerOnChange(fn: (obj: string) => void): void {
    this.changeHandler = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touchedHandler = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
