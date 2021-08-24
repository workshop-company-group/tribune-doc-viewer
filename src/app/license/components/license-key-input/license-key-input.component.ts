import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl,
  NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { KEY_LENGTH } from '../../services';

@Component({
  selector: 'app-license-key-input',
  templateUrl: './license-key-input.component.html',
  styleUrls: ['./license-key-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LicenseKeyInputComponent),
      multi: true,
    },
  ],
})
export class LicenseKeyInputComponent
implements ControlValueAccessor, OnDestroy, OnInit {

  public readonly inputControl = new FormControl('');

  private changeHandler: (obj: string) => void = () => {
    // empty
  };

  private touchedHandler: () => void = () => {
    // empty
  };

  private readonly subscriptions: Subscription[] = [];

  constructor() { }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe(),
    );
    this.subscriptions.length = 0;
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.inputControl.valueChanges.pipe(
        filter((value: string) => !!value.length),
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

  public registerOnChange(fn: (obj: string) => void): void {
    this.changeHandler = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touchedHandler = fn;
  }

  private formatInput(value: string): string {
    const uppercasedNonsplited = value
      .split('-').join('')
      .slice(0, KEY_LENGTH)
      .replace(/[^0-9a-z]/gi, '')
      .toUpperCase();

    const splitted = uppercasedNonsplited.match(/.{1,5}/g);

    return splitted?.join('-') || uppercasedNonsplited;
  }

}
