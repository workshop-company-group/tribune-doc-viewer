import { Injectable } from '@angular/core';

import { FileSystemService } from '../../shared/services';

import { Mountpoint, FolderContent,
  FileInfo, Folder } from '../../shared/models';
import { AppConfig } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileSelectService {

  public mountpoints: Mountpoint[] = [];

  public selectedMountpoint?: Mountpoint;

  public currentDirPath?: string;

  public currentDirContent?: FolderContent;

  public selectedPath?: string;

  constructor(
    private readonly fileSystem: FileSystemService,
  ) { }

  public changeDir(path: string): void {
    this.currentDirPath = path;
    this.currentDirContent = this.filterDirContent(
      this.fileSystem.getFolderContent(path),
    );
    this.selectedPath = undefined;
  }

  public changeDirToParent(): void {
    if (!this.currentDirPath) {
      throw new Error('Error: Current directory is not selected.');
    }
    this.changeDir(this.fileSystem.getParentDir(this.currentDirPath));
  }

  private filterDirContent(content: FolderContent): FolderContent {
    return {
      files: content.files.filter(file =>
        AppConfig.supportedFileTypes.includes(file.type)),
      folders: content.folders.filter(folder => folder.access),
    };
  }

  public getFileTypeIconPath(fileType: string): string {
    return `assets/icons/file-formats/${fileType}.svg`;
  }

  public isMountpointSelected(mountpoint: Mountpoint): boolean {
    return this.selectedMountpoint === mountpoint;
  }

  public isCurrentDirRoot(): boolean {
    if (!this.currentDirPath || !this.selectedMountpoint) {
      throw new Error('Error: Current directory or mountpoint is not selected');
    }
    return !this.fileSystem.dirAboveExists(this.currentDirPath)
      || this.currentDirPath === this.selectedMountpoint.path;
  }

  /**
   * Checks if service is loaded and ready for work.
   * Service is ready for work if mountpoints are loaded,
   * mountpoint and current directory are selected.
   */
  public isLoaded(): boolean {
    return !!this.mountpoints.length
      && !!this.selectedMountpoint
      && !!this.currentDirPath
      && !!this.currentDirContent;
  }

  // must be called before using any other methods
  public async loadMountpoints(): Promise<void> {
    this.mountpoints = [];

    // loading
    const drives = await this.fileSystem.listDrives();
    for (const drive of drives) {
      this.mountpoints = this.mountpoints.concat(
        drive.mountpoints.filter(
          mountpoint => this.fileSystem.dirExists(mountpoint.path),
        ),
      );
    }

    // setting selected mountpoint and path
    if (this.mountpoints.length) {
      this.selectMountpoint(this.mountpoints[0]);
    }
  }

  public select(fileLike: FileInfo | Folder | null): void {
    this.selectedPath = fileLike?.path;
  }

  public selectMountpoint(mountpoint: Mountpoint): void {
    this.selectedMountpoint = mountpoint;
    this.changeDir(this.selectedMountpoint.path);
  }

}
