import { Location, } from '@angular/common';
import { Component, } from '@angular/core';
import { FormControl, } from '@angular/forms';

import { AuthService, } from '../../../shared/services';
import { PasswordStateService, } from '../../services';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss']
})
export class PasswordPageComponent {

  public password = new FormControl('');

  public isPasswordWrong = false;

  constructor(
    public readonly auth: AuthService,
    public readonly location: Location,
    public readonly passwordState: PasswordStateService,
  ) {
    this.password.valueChanges.subscribe(() => this.isPasswordWrong = false);
  }

  public continueWithPassword(): void {
    const isValid: boolean = this.auth.passwordIsValid(this.password.value);
    if (isValid) {
      this.passwordState.continueWithPassword();
    } else {
      this.isPasswordWrong = true;
    }
  }

}
