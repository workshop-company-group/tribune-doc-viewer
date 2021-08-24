import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { WindowStateService } from '../../../shared/services';
import { LicenseService } from '../../services';

@Component({
  selector: 'app-license-dialog',
  templateUrl: './license-dialog.component.html',
  styleUrls: ['./license-dialog.component.scss'],
})
export class LicenseDialogComponent implements OnInit {

  public wrongKey = false;

  public readonly keyControl = new FormControl('', [
    Validators.required,
    Validators.minLength(25),
  ]);

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly license: LicenseService,
    public readonly windowState: WindowStateService,
  ) { }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe(),
    );
    this.subscriptions.length = 0;
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.keyControl.valueChanges.subscribe(
        () => this.wrongKey = false,
      ),
    );
  }

  public async activate(): Promise<void> {
    const result = await this.license.activate(this.keyControl.value);

    this.wrongKey = !result;
    if (result) {
      // TODO
    }
  }

  public exit(): void {
    this.windowState.exit();
  }

}
