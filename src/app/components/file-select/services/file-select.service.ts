import { Injectable } from '@angular/core';

import { FileSystemService, } from '../../../shared/services';

import { Mountpoint, } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class FileSelectService {

  public mountpoints: Mountpoint[] = [];

  public selectedMountpoint: Mountpoint;

  constructor(
    private readonly fileSystem: FileSystemService,
  ) { }

  public isMountpointSelected(mountpoint: Mountpoint): boolean {
    return this.selectedMountpoint === mountpoint;
  }

  public async loadMountpoints(): Promise<void> {
    this.mountpoints = [];

    // loading
    const drives = await this.fileSystem.listDrives();
    for (const drive of drives) {
      this.mountpoints = this.mountpoints.concat(
        drive.mountpoints.filter(
          mountpoint => this.fileSystem.dirExists(mountpoint.path)
        )
      );
    }

    // setting selected mountpoint and path
    if (this.mountpoints.length) {
      this.selectedMountpoint = this.mountpoints[0];
    }
  }

  public selectMountpoint(mountpoint: Mountpoint): void {
    this.selectedMountpoint = mountpoint;
  }

}
