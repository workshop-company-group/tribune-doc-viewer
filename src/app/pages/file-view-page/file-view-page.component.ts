import { Component, OnInit } from '@angular/core';

import { DocumentService } from './services';

@Component({
  selector: 'app-file-view-page',
  templateUrl: './file-view-page.component.html',
  styleUrls: ['./file-view-page.component.scss']
})
export class FileViewPageComponent implements OnInit {

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
  }

}
