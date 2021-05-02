import { Injectable } from '@angular/core';

import { FileSystemService, } from '../../../shared/services';

import { Mountpoint, FolderContent, File, } from '../../../shared/models';

const supportedFileTypes = ['ppt', 'pptx', 'pdf'];

@Injectable({
  providedIn: 'root'
})
export class FileSelectService {

  public mountpoints: Mountpoint[] = [];

  public selectedMountpoint: Mountpoint;

  public currentDirPath: string;

  public currentDirContent: FolderContent;

  public selectedFilePath: string;

  constructor(
    private readonly fileSystem: FileSystemService,
  ) { }

  public changeDir(path: string) {
    this.currentDirPath = path;
    this.currentDirContent = this.filterDirContent(
      this.fileSystem.getFolderContent(path)
    );
    this.selectedFilePath = '';
  }

  public changeDirToParent() {
    this.changeDir(this.fileSystem.getParentDir(this.currentDirPath));
  }

  private filterDirContent(content: FolderContent): FolderContent {
    return {
      files: content.files.filter(file =>
        supportedFileTypes.includes(file.type)),
      folders: content.folders,
    };
  }

  public getFileTypeIconPath(fileType: string): string {
    return `assets/icons/file-formats/${fileType}.svg`;
  }

  public isMountpointSelected(mountpoint: Mountpoint): boolean {
    return this.selectedMountpoint === mountpoint;
  }

  public isCurrentDirRoot(): boolean {
    return !this.fileSystem.dirAboveExists(this.currentDirPath);
  }

  // must be called before using any other methods
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
      this.selectMountpoint(this.mountpoints[0]);
    }
  }

  public selectFile(file: File): void {
    this.selectedFilePath = file.path;
  }

  public selectMountpoint(mountpoint: Mountpoint): void {
    this.selectedMountpoint = mountpoint;
    this.changeDir(this.selectedMountpoint.path);
  }

}
