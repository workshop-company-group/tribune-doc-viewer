import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { FileSystemService } from '../../../shared/services';
import { DocumentService } from '../../../file-view/services';
import { FileSelectService } from '../../services';

import { Folder } from '../../../shared/models';

const DOUBLE_CLICK_TIME = 500;

@Component({
  selector: 'app-file-select-dialog',
  templateUrl: './file-select-dialog.component.html',
  styleUrls: ['./file-select-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileSelectDialogComponent implements OnInit {

  @Input()
  public openButtonText: string;

  @Output('close-click')
  public readonly closeEmitter = new EventEmitter<void>();

  @Output('open-click')
  public readonly openEmitter = new EventEmitter<string>();

  @Input()
  public folderSelect = false;

  private lastClickTime?: number;

  constructor(
    public readonly cd: ChangeDetectorRef,
    public readonly documentService: DocumentService,
    public readonly fileSelect: FileSelectService,
    public readonly fileSystem: FileSystemService,
  ) { }

  public async ngOnInit(): Promise<void> {
    if (!this.openButtonText) {
      throw new Error('Error: Open button text is undefined.');
    }

    await this.fileSelect.loadMountpoints();
    this.cd.detectChanges();
  }

  public onFolderClick(folder: Folder): void {
    if (!this.folderSelect) {
      this.fileSelect.changeDir(folder.path);
      return;
    }

    // folder was selected and clicked again not later than doubleClickTime
    if (this.lastClickTime
      && Date.now() - this.lastClickTime <= DOUBLE_CLICK_TIME
      && this.fileSelect.selectedPath === folder.path) {
      this.onFolderDoubleClick(folder);
    } else {
      this.fileSelect.select(folder);
      this.lastClickTime = Date.now();
    }
  }

  public onFolderDoubleClick(folder: Folder): void {
    if (!this.folderSelect) return;
    this.fileSelect.select(null);
    this.lastClickTime = undefined;
    this.fileSelect.changeDir(folder.path);
  }

}
