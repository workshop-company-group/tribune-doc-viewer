import { Component, OnInit } from '@angular/core';

import { DocumentService } from '../../services';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {

  constructor(public documentService: DocumentService) { }

  ngOnInit(): void {
  }

}
