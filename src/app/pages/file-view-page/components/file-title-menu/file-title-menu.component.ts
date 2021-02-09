import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Document } from '../../models';
import { DocumentService } from '../../services';

@Component({
  selector: 'app-file-title-menu',
  templateUrl: './file-title-menu.component.html',
  styleUrls: ['./file-title-menu.component.scss']
})
export class FileTitleMenuComponent implements OnInit {

  constructor(private router: Router,
              public documentService: DocumentService) { }

  ngOnInit(): void { }

  public openMainMenu(): void {
    this.router.navigate(['/main-menu']);
  }

  public selectDocument(index: number): void {
    this.documentService.unselectAll();
    this.documentService.opened[index].selected = true;
  }

}
