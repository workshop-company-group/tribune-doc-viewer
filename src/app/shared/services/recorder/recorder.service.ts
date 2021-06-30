import { Injectable } from '@angular/core';
import { desktopCapturer } from 'electron';
import { ElectronService } from '../../../core/services';
import { SettingsService } from '../../../settings/services'
import { Display } from '../../models';
import { RecorderError } from '../exceptions'
import * as si from 'systeminformation';
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
  si: typeof si;
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
      this.si = window.require('systeminformation');
      this.desktopCapturer = window.require('electron').desktopCapturer;
    }
  }

  // public async getScreensMeta(): Promise<Display[]> {
  //   return (await this.si.graphics()).displays.slice(2);
  // }

  public async getCapturerSource(): Promise<Electron.DesktopCapturerSource|null> {
    const availableDisplays = await this.settings.getAvailableDisplays()
    let sourceNumber = -1;
    const con = this.settings.screenConnection;

    for (let i = 0; i < availableDisplays.length; i++) {
      const display = availableDisplays[i];
      if (display.connection === con) sourceNumber = i;
    }

    if (sourceNumber === -1)
      throw new RecorderError('Failed to find monitor');

    const sources = await this.desktopCapturer.getSources({types: ['screen']});
    return sources[sourceNumber+1];
  }

  private async getAudioDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices;
  }

  public async setExternalMonitor(display: number = 0): Promise<void> {
    this.recordScreen = await this.getCapturerSource();
    const mics = await this.getAudioDevices();


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
    this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: 'video\/webm' });
    this.mediaRecorder.ondataavailable = this.onDataAvailable;
    this.mediaRecorder.onstop = (e) => { this.onStop(e) };
  }

  private onDataAvailable(e: Event): void {
    recordedChunks.push(e['data']);
  }

  private async onStop(e: Event): Promise<void> {
    const blob = new Blob(recordedChunks, {
      type: 'video/mp4; codecs=vp9'
    });

    const buffer = Buffer.from(await blob.arrayBuffer());

    // if (!this.filepath) {
    //   const date = new Date().toString();
    //   this.filepath = './temp/' + date + '.webm';
    // }
    fs.writeFile(this.filepath, buffer, () => {});
    recordedChunks = [];
  }

  public start(): void {
    this.mediaRecorder.start();
  }

  public stop(filepath: string): void {
    if (this.settings.withSource) {
      this.filepath = filepath;
    }
    else {
      if (process.platform !== 'win32')
        this.filepath = this.settings.savePath + '/' + path.basename(filepath);
      else
        this.filepath = this.settings.savePath + '\\' + path.basename(filepath);
    }
    this.mediaRecorder.stop();
  }

  public pause(): void {
    this.mediaRecorder.pause();
  }

  public continue(): void {
    this.mediaRecorder.resume();
  }
}
