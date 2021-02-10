import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { DocumentService } from '../../services';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {

  @ViewChild('uploadDocumentInput')
  public uploadDocumentInput: ElementRef;

  constructor(public documentService: DocumentService) { }

  ngOnInit(): void {
  }

  public openDocument(files: FileList): void {
    if (files.length !== 1) {
      console.warn('WARNING: zero or multiple files were selected for openining' + 
                   ' :FileViewerComponent:openDocument');
      return;
    }
    this.documentService.open(files[0].path)
  }

}
