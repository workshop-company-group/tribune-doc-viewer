import { Component, EventEmitter, Output, } from '@angular/core';

import { FileSystemService, } from '../../../../shared/services';
import { FileSelectService, } from '../../services';

import { Drive, Mountpoint, } from '../../../../shared/models';

@Component({
  selector: 'app-file-select-dialog',
  templateUrl: './file-select-dialog.component.html',
  styleUrls: ['./file-select-dialog.component.scss']
})
export class FileSelectDialogComponent {

  @Output('close-click')
  public readonly closeEmitter = new EventEmitter<void>();

  public mountpoints: Mountpoint[];

  public currentMountpoint: Mountpoint;

  constructor(
    public readonly fileSelect: FileSelectService,
    public readonly fileSystem: FileSystemService,
  ) { }

  public async openFiles(): Promise<void> {
    // TODO: open files
    // await DocumentService.open(path)
    this.closeEmitter.emit();
  }

}
