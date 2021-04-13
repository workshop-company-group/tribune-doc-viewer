import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { ElectronService } from '../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class ExternalViewerService {
  ipcRenderer: typeof ipcRenderer;

  constructor(private electron: ElectronService) {
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }

  public setPdf(path: string): void {
    this.ipcRenderer.send('set-pdf', path);
  }

  public nextPage(): void {
    this.ipcRenderer.send('next-page');
  }

  public previousPage(): void {
    this.ipcRenderer.send('previous-page');
  }

  public setPage(pageNumber: number): void {
    this.ipcRenderer.send('set-page', pageNumber);
  }
}
