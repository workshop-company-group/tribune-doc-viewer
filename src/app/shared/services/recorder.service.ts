import { Injectable } from '@angular/core';
import { desktopCapturer } from 'electron';
import { ElectronService } from '../../core/services';

@Injectable({
  providedIn: 'root'
})
export class RecorderService {
  desktopCapturer: typeof desktopCapturer;
  recordScreen: Electron.DesktopCapturerSource;
  options: object;
  mediaRecorder: MediaRecorder;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.desktopCapturer = window.require('electron').desktopCapturer;
      this.recordScreen = null;
    }
  }

  private async getScreens() {
    return await this.desktopCapturer.getSources({types: ['screen']});
  }

  private async setExternalMonitor(): Promise<void> {
    const screens = await this.getScreens();
    // if (screens.length === 1)
    if (screens.length === 0)
      this.recordScreen = null;
    else {
      // this.recordScreen = screens[1];
      this.recordScreen = screens[0];
      const options = {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: this.recordScreen.id,
            minWidth: 1600,
            maxWidth: 900,
            minHeight: 1600,
            maxHeight: 900
          }
        }
      }
      const media = await navigator.mediaDevices.getUserMedia(this.options);
      this.mediaRecorder = new MediaRecorder(media);
    }
  }

  private async start(): Promise<void> {
  }
}
