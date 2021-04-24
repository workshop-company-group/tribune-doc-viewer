import { Component, EventEmitter, Output, } from '@angular/core';

@Component({
  selector: 'app-file-select-dialog',
  templateUrl: './file-select-dialog.component.html',
  styleUrls: ['./file-select-dialog.component.scss']
})
export class FileSelectDialogComponent {

  @Output('close-click')
  public readonly closeEmitter = new EventEmitter<void>();

  constructor() { }

  public async openFiles(): Promise<void> {
    // TODO: open files
    // await DocumentService.open(path)
    this.closeEmitter.emit();
  }

}
