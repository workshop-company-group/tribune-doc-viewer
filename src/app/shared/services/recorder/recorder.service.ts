import { Injectable } from '@angular/core';
import { desktopCapturer } from 'electron';
import { ElectronService } from '../../../core/services';
import { SettingsService } from '../'
import * as fs from 'fs';
import * as path from 'path';

declare var navigator: any;
let recordedChunks = [];

@Injectable({
  providedIn: 'root'
})
export class RecorderService {
  fs: typeof fs;
  path: typeof path;
  desktopCapturer: typeof desktopCapturer;
  recordScreen: Electron.DesktopCapturerSource;
  screenStream: MediaStream = null;
  micStream: MediaStream = null;
  mediaRecorder: MediaRecorder = null;
  stream: MediaStream = null;
  recordedBlobs = [];
  filepath: string = null;

  constructor(
    private electron: ElectronService,
    private settings: SettingsService) {
    if (this.electron.isElectron) {
      this.fs = window.require('fs');
      this.path = window.require('path');
      this.desktopCapturer = window.require('electron').desktopCapturer;
    }
  }

  private async getScreens() {
    return await this.desktopCapturer.getSources({types: ['screen']});
  }

  private async getAudioDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices()
    devices.forEach(function(device) {
    console.log(device.kind + ": " + device.label +
                " id = " + device.deviceId);
    });
    return devices;
  }

  public async setExternalMonitor(): Promise<void> {
    const screens = await this.getScreens();
    const mics = await this.getAudioDevices();
    // if (screens.length === 0) // uncomment for testing on primary monitor
    if (screens.length === 1)
      this.recordScreen = null;
    else {
      // this.recordScreen = screens[0]; // uncomment for testing on primary monitor
      this.recordScreen = screens[1];
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

      this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: 'video\/webm' });
      this.mediaRecorder.ondataavailable = this.onDataAvailable;
      this.mediaRecorder.onstop = (e) => { this.onStop(e) };
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

    // if (!this.filepath) {
    //   const date = new Date().toString();
    //   this.filepath = './temp/' + date + '.webm';
    // }
    fs.writeFile(this.filepath, buffer, () => console.log('video saved successfully!'));
    recordedChunks = [];
  }

  public start(): void {
    this.mediaRecorder.start();
  }

  public stop(filepath: string = null): void {
    if (this.settings.withSource)
      this.filepath = filepath;
    else
      this.filepath = this.settings.savePath + '/' + path.basename(filepath);
    this.mediaRecorder.stop();
  }

  public pause(): void {
    this.mediaRecorder.pause();
  }

  public continue(): void {
    this.mediaRecorder.resume();
  }
}
