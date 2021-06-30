import { Component, ElementRef, forwardRef,
  HostBinding, HostListener, Input, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
})
export class SelectComponent implements ControlValueAccessor {

  public value: string;

  @Input()
  public set options(value: string[] | null) {
    if (!value || !value.length) {
      this.disabled = true;
    }
    this.valueOptions = value;
  }

  public valueOptions: string[] = [];

  public opened: boolean = false;

  public changeHandler: (obj: string) => {};

  public touchedHandler: () => {};

  @HostBinding()
  public disabled: boolean = false;

  constructor(
    private readonly element: ElementRef,
  ) { }

  public get iconSrc(): string {
    return this.disabled
      ? "assets/icons/arrows/down-arrow-filled-disabled.svg"
      : "assets/icons/arrows/down-arrow-filled.svg";
  }

  @HostListener('document:click', ['$event'])
  public handleClick(event: any) {
    if (!this.element.nativeElement.contains(event.target)) {
      this.changeOverlayState(false);
    } else {
      event.stopImmediatePropagation();
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

  public registerOnChange(fn: (obj: string) => {}): void {
    this.changeHandler = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.touchedHandler = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
