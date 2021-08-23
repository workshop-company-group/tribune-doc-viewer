import { Component, forwardRef, Input, OnDestroy, OnInit, } from '@angular/core';
import { ControlValueAccessor, FormControl,
  NG_VALUE_ACCESSOR, } from '@angular/forms';

import { Subscription, } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-license-key-input',
  templateUrl: './license-key-input.component.html',
  styleUrls: ['./license-key-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LicenseKeyInputComponent),
      multi: true,
    }
  ],
})
export class LicenseKeyInputComponent
implements ControlValueAccessor, OnDestroy, OnInit {

  public readonly inputControl = new FormControl('');

  private changeHandler: Function = () => {};

  private touchedHandler: Function = () => {};

  private readonly subscriptions: Subscription[] = [];

  constructor() { }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
    this.subscriptions.length = 0;
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.inputControl.valueChanges.pipe(
        filter(value => !!value.length),
        map(value => this.formatInput(value)),
      ).subscribe(value => {
        this.inputControl.setValue(value, { emitEvent: false });
        this.changeHandler(value
          .split('-').join(''));
      }),
    );
  }

  public writeValue(obj: string): void {
    this.inputControl.setValue(this.formatInput(obj));
  }

  public registerOnChange(fn: Function): void {
    this.changeHandler = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.touchedHandler = fn;
  }

  private formatInput(value: string): string {
    const uppercasedNonsplited = value
      .split('-').join('')
      .slice(0, 25)
      .replace(/[^0-9a-z]/gi, '')
      .toUpperCase();

    const splitted = uppercasedNonsplited.match(/.{1,5}/g);

    return splitted?.join('-') ?? uppercasedNonsplited;
  }

}
