import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { List } from 'immutable';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {

  public value: string;

  @Input()
  public set options(value: List<string> | null) {
    if (!value || !value.size) {
      this.disabled = true;
      return;
    }
    this.valueOptions = value;
  }

  public valueOptions = List<string>();

  public opened = false;

  public changeHandler: (obj: string) => void;

  public touchedHandler: () => void;

  @HostBinding()
  public disabled = false;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
  ) { }

  public get iconSrc(): string {
    return this.disabled
      ? 'assets/icons/arrows/down-arrow-filled-disabled.svg'
      : 'assets/icons/arrows/down-arrow-filled.svg';
  }

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    if (event.target && this.el.nativeElement.contains(event.target as Node)) {
      event.stopImmediatePropagation();
    } else {
      this.changeOverlayState(false);
    }
  }

  public select(obj: string): void {
    this.value = obj;
    this.changeOverlayState(false);
    this.changeHandler(obj);
    this.touchedHandler();
  }

  public changeOverlayState(opened: boolean): void {
    if (this.disabled) return;
    this.opened = opened;
  }

  public writeValue(obj: string): void {
    this.value = obj;
  }

  public registerOnChange(fn: (obj: string) => void): void {
    this.changeHandler = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touchedHandler = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
