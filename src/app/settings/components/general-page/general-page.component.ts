import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormControl, FormGroup, } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { AppConfig } from '../../../../environments/environment';
import { Locale, } from '../../../locale/models';

import { SettingsService, } from '../../services';
import { AuthService, } from '../../../password/services';

@Component({
  selector: 'app-general-page',
  templateUrl: './general-page.component.html',
  styleUrls: ['./general-page.component.scss']
})
export class GeneralPageComponent implements OnInit, OnDestroy {

  public readonly localeControl = new FormControl(this.settings.locale);

  public readonly passwordControl = new FormGroup({
    current: new FormControl(''),
    update: new FormControl(''),
  });

  public wrongPasswordHint = false;
  public passwordControlsOpened = false;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly auth: AuthService,
    public readonly settings: SettingsService,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.localeControl.valueChanges.subscribe(locale => {
        this.settings.locale = locale;
      }),
      this.passwordControl.controls.current.valueChanges.subscribe((value) => {
        this.wrongPasswordHint = false;
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public get locales(): Locale[] {
    return AppConfig.supportedLangs;
  }

  public savePassword(): void {
    const currentPassword = this.passwordControl.controls.current.value;
    const updatePassword = this.passwordControl.controls.update.value;

    if (!this.auth.passwordIsValid(currentPassword)) {
      this.wrongPasswordHint = true;
      return;
    }

    this.auth.setPassword(updatePassword);
    this.passwordControlsOpened = false;
  }

}
