import { Injectable } from '@angular/core';
import { desktopCapturer } from 'electron';
import { ElectronService } from '../../core/services';
import * as fs from 'fs';

declare var navigator: any;
let recordedChunks = [];

@Injectable({
  providedIn: 'root'
})
export class RecorderService {
  fs: typeof fs;
  desktopCapturer: typeof desktopCapturer;
  recordScreen: Electron.DesktopCapturerSource;
  screenStream: MediaStream = null;
  micStream: MediaStream = null;
  mediaRecorder: MediaRecorder = null;
  stream: MediaStream = null;
  recordedBlobs = [];

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.fs = window.require('fs');
      this.desktopCapturer = window.require('electron').desktopCapturer;
    }
  }

  private async getScreens() {
    // return await this.desktopCapturer.getSources({types: ['window']});
    return await this.desktopCapturer.getSources({types: ['screen']});
  }

  private async getMics() {
    const devices = await navigator.mediaDevices.enumerateDevices()
    devices.forEach(function(device) {
    console.log(device.kind + ": " + device.label +
                " id = " + device.deviceId);
    });
    return devices;
  }

  public async setExternalMonitor(): Promise<void> {
    const screens = await this.getScreens();
    const mics = await this.getMics();
    if (screens.length === 1) // comment for primary monitor testing
    // if (screens.length === 0) // uncomment for primary monitor testing
      this.recordScreen = null;
    else {
      this.recordScreen = screens[1]; // uncomment for primary monitor testing
      // this.recordScreen = screens[0]; // uncomment for primary monitor testing
      console.log(mics[1].deviceId);
      this.screenStream = await navigator.mediaDevices.getUserMedia({
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: this.recordScreen.id
          }
        }
      });
      this.micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: { exact: mics[1].deviceId }
        }
      });
      let tracks = [...this.screenStream.getTracks(), ...this.micStream.getAudioTracks()]
      this.stream = new MediaStream(tracks);
      console.log('screenStream: ', this.screenStream);
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.mediaRecorder.ondataavailable = this.onDataAvailable;
      this.mediaRecorder.onstop = this.onStop;
    }
  }

  private onDataAvailable(e: Event): void {
    console.log('video data available');
    recordedChunks.push(e['data']);
  }

  private async onStop(e: Event): Promise<void> {
    console.log('onstop: ', e);
    const blob = new Blob(recordedChunks, {
      type: 'video/mp4; codecs=vp9'
    });

    const buffer = Buffer.from(await blob.arrayBuffer());
    const date = new Date().toString();
    const filePath = '/Users/minish144/' + date + '.webm';

    console.log(filePath);

    fs.writeFile(filePath, buffer, () => console.log('video saved successfully!'));
    recordedChunks = [];
  }

  public start(): void {
    this.mediaRecorder.start();
  }

  public stop(): void {
    this.mediaRecorder.stop();
  }

  public save(): void {
  }

  public stopAndSave(): void {

  }
}
