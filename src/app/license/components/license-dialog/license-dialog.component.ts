import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { BehaviorSubject, Subscription } from 'rxjs';

import { WindowStateService } from '../../../shared/services';
import { LicenseService, KEY_LENGTH } from '../../services';

@Component({
  selector: 'app-license-dialog',
  templateUrl: './license-dialog.component.html',
  styleUrls: ['./license-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseDialogComponent implements OnDestroy, OnInit {

  public readonly wrongKey = new BehaviorSubject<boolean>(false);

  public readonly keyControl = new FormControl('', [
    // Angular syntax of using `required` validator
    // eslint-disable-next-line @typescript-eslint/unbound-method
    Validators.required,
    Validators.minLength(KEY_LENGTH),
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
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.keyControl.valueChanges.subscribe(
        () => this.wrongKey.next(false),
      ),
    );
  }

  public async activate(): Promise<void> {
    const result = await this.license.activate(this.keyControl.value);

    this.wrongKey.next(!result);
  }

  public exit(): void {
    this.windowState.exit();
  }

}
