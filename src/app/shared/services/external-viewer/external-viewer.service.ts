import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { ElectronService } from '../../../core/services';

@Injectable({
  providedIn: 'root',
})
export class ExternalViewerService {
  constructor(
    private readonly electron: ElectronService,
  ) {}

  public setPdf(path: string): void {
    ipcRenderer.send('set-pdf', path);
  }

  public nextPage(): void {
    ipcRenderer.send('next-page');
  }

  public previousPage(): void {
    ipcRenderer.send('previous-page');
  }

  public setPage(pageNumber: number): void {
    ipcRenderer.send('set-page', pageNumber);
  }
}
