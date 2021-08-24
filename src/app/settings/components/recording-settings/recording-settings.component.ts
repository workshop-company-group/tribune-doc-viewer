import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { SettingsService } from '../../services';
import { FileSystemService } from '../../../shared/services';
import { FileSelectService } from '../../../file-select/services';

@Component({
  selector: 'app-recording-settings',
  templateUrl: './recording-settings.component.html',
  styleUrls: ['./recording-settings.component.scss']
})
export class RecordingSettingsComponent implements OnInit {

  public readonly pathControl = new FormControl(this.settings.savePath);

  public pathDoesNotExist: boolean = false;

  public fileSelectDialogOpened: boolean = false;

  public readonly saveToggle = new FormControl(this.settings.withSource);

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly fileSelect: FileSelectService,
    public readonly fileSystem: FileSystemService,
    public readonly settings: SettingsService,
  ) { }

  public ngOnInit(): void {
    this.pathControl.setValue(this.settings.savePath);
    this.saveToggle.setValue(this.settings.withSource);
    this.fileSelect.loadMountpoints();

    this.subscriptions.push(
      this.pathControl.valueChanges.subscribe(value => {
        this.pathDoesNotExist = !this.fileSystem.dirExists(value);
      }),
      this.saveToggle.valueChanges.subscribe(value => {
        this.settings.withSource = value;
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public applyPath(): void {
    this.settings.savePath = this.pathControl.value;
    this.pathControl.setValue(this.settings.savePath, { emitEvent: false });
  }

  public selectFolder(path: string) {
    this.pathControl.setValue(path, { emitEvent: false });
    this.fileSelectDialogOpened = false;
  }

}
