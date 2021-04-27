import { Component, EventEmitter, Output, } from '@angular/core';

import { from, Observable, } from 'rxjs';

import { FileSystemService, } from '../../../../shared/services';

import { Drive, Mountpoint, } from '../../../../shared/models';

@Component({
  selector: 'app-file-select-dialog',
  templateUrl: './file-select-dialog.component.html',
  styleUrls: ['./file-select-dialog.component.scss']
})
export class FileSelectDialogComponent {

  @Output('close-click')
  public readonly closeEmitter = new EventEmitter<void>();

  public mountpoints: Observable<Mountpoint[]> =
    from(this.listMountpoints());

  constructor(
    public readonly fileSystem: FileSystemService,
  ) { }

  public async openFiles(): Promise<void> {
    const mountpoints = await this.listMountpoints();
    console.log(mountpoints);
    // TODO: open files
    // await DocumentService.open(path)
    this.closeEmitter.emit();
  }

  public async listMountpoints(): Promise<Mountpoint[]> {
    const mountpoints: Mountpoint[] = [];
    const drives: Drive[] = await this.fileSystem.listDrives();
    for (const drive of drives) {
      for (const mountpoint of drive.mountpoints) {
        if (this.fileSystem.dirExists(mountpoint.path)) {
          mountpoints.push(mountpoint);
        }
      }
    }
    return mountpoints;
  }

}
