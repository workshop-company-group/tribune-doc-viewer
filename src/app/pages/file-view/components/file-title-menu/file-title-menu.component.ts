import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Document } from '../../models';
import { DocumentService } from '../../services';

@Component({
  selector: 'app-file-title-menu',
  templateUrl: './file-title-menu.component.html',
  styleUrls: ['./file-title-menu.component.scss']
})
export class FileTitleMenuComponent implements OnInit {

  @ViewChild('uploadDocumentInput')
  public uploadDocumentInput: ElementRef;

  constructor(private router: Router,
              public documentService: DocumentService) { }

  ngOnInit(): void { }

  public async openDocument(files: FileList): Promise<void> {
    if (files.length !== 1) {
      console.warn('WARNING: zero or multiple files were selected for openining' + 
                   ' :FileViewerComponent:openDocument');
      return;
    }
    await this.documentService.open(files[0].path);
  }

}
