import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { BehaviorSubject, Subscription } from 'rxjs';

import { AuthService, PasswordStateService } from '../../services';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordPageComponent implements OnDestroy {

  public readonly password = new FormControl('', [
    // Angular syntax of using `required` validator
    // eslint-disable-next-line @typescript-eslint/unbound-method
    Validators.required,
  ]);

  public readonly isPasswordWrong = new BehaviorSubject<boolean>(false);

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly auth: AuthService,
    public readonly location: Location,
    public readonly passwordState: PasswordStateService,
  ) {
    this.subscriptions.push(
      this.password.valueChanges.subscribe(
        () => this.isPasswordWrong.next(false),
      ),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public async continueWithPassword(): Promise<void> {
    const isValid = this.auth.passwordIsValid(this.password.value);
    if (isValid) {
      await this.passwordState.continueWithPassword();
    } else {
      this.isPasswordWrong.next(true);
    }
  }

}
