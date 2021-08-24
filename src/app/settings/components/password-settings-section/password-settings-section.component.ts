import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../../../password/services';

@Component({
  selector: 'app-password-settings-section',
  templateUrl: './password-settings-section.component.html',
  styleUrls: ['./password-settings-section.component.scss'],
})
export class PasswordSettingsSectionComponent implements OnDestroy, OnInit {

  public readonly passwordControl = new FormGroup({
    current: new FormControl(''),
    update: new FormControl(''),
  });

  public wrongPasswordHint = false;
  public passwordControlsOpened = false;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly auth: AuthService,
  ) { }

  public get currentControl(): FormControl {
    return this.passwordControl.controls.current as FormControl;
  }

  public get updateControl(): FormControl {
    return this.passwordControl.controls.update as FormControl;
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.currentControl.valueChanges.subscribe((value) => {
        this.wrongPasswordHint = false;
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public savePassword(): void {
    const currentPassword = this.currentControl.value;
    const updatePassword = this.updateControl.value;

    if (!this.auth.passwordIsValid(currentPassword)) {
      this.wrongPasswordHint = true;
      return;
    }

    this.auth.setPassword(updatePassword);
    this.closeEditingMode();
 }

  public closeEditingMode(): void {
    this.passwordControlsOpened = false;
    this.wrongPasswordHint = false;
    this.clearInputs();
  }

  private clearInputs(): void {
    this.currentControl.setValue('');
    this.updateControl.setValue('');
  }

}
