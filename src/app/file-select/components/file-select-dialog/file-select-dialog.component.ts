import { Component, EventEmitter, Input,
  Output, } from '@angular/core';

import { FileSystemService, } from '../../../shared/services';
import { DocumentService, } from '../../../file-view/services';
import { FileSelectService, } from '../../services';

import { Drive, Mountpoint,
  FileInfo, Folder, } from '../../../shared/models';

@Component({
  selector: 'app-file-select-dialog',
  templateUrl: './file-select-dialog.component.html',
  styleUrls: ['./file-select-dialog.component.scss']
})
export class FileSelectDialogComponent {

  @Input('open-button')
  public openButtonText = 'Выбрать';

  @Output('close-click')
  public readonly closeEmitter = new EventEmitter<void>();

  @Output('open-click')
  public readonly openEmitter = new EventEmitter<string>();

  @Input()
  public folderSelect: boolean = false;

  public mountpoints: Mountpoint[];
  public currentMountpoint: Mountpoint;

  private lastClickTime: number | null = null;
  private readonly doubleClickTime = 500;

  constructor(
    public readonly documentService: DocumentService,
    public readonly fileSelect: FileSelectService,
    public readonly fileSystem: FileSystemService,
  ) { }

  public onFolderClick(folder: Folder): void {
    if (!this.folderSelect) {
      this.fileSelect.changeDir(folder.path);
      return
    }

    // folder was selected and clicked again not later than doubleClickTime
    if (this.lastClickTime
      && Date.now() - this.lastClickTime <= this.doubleClickTime
      && this.fileSelect.selectedPath === folder.path) {
      this.onFolderDoubleClick(folder);
    } else {
      this.fileSelect.select(folder);
      this.lastClickTime = Date.now();
    }
  }

  public onFolderDoubleClick(folder: Folder): void {
    if (!this.fileSelect) return;
    this.fileSelect.select(null);
    this.lastClickTime = null;
    this.fileSelect.changeDir(folder.path)
  }

  public get currentDirFiles(): FileInfo[] {
    return this.folderSelect
      ? []
      : this.fileSelect.currentDirContent.files;
  }

}
