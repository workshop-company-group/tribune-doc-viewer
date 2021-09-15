import { Injectable } from '@angular/core';
import { desktopCapturer } from 'electron';
import { SettingsService } from '../../../settings/services';
import { RecorderError } from '../exceptions';
import * as fs from 'fs';
import * as path from 'path';

// the only working way is using any here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let navigator: any;
let recordedChunks: BlobPart[] = [];

@Injectable({
  providedIn: 'root',
})
export class RecorderService {
  private recordScreen: Electron.DesktopCapturerSource | null;

  private screenStream?: MediaStream;

  private micStream?: MediaStream;

  private mediaRecorder?: MediaRecorder;

  private stream?: MediaStream;

  private filepath: string;

  constructor(
    private readonly settings: SettingsService,
  ) {}

  public async getCapturerSource():
  Promise<Electron.DesktopCapturerSource | null> {
    const availableDisplays = this.settings.externalDisplays.value
    let sourceNumber = -1;
    const con = this.settings.screenConnection;

    for (let i = 0; i < availableDisplays.length; i++) {
      const display = availableDisplays[i];
      if (display.connection === con) sourceNumber = i;
    }

    if (sourceNumber === -1)
      throw new RecorderError('Failed to find monitor');

    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    return sources[sourceNumber + 1];
  }

  private async getAudioDevices(): Promise<MediaDeviceInfo[]> {
    const devices =
      await (navigator as Navigator).mediaDevices.enumerateDevices();
    return devices;
  }

  public async setExternalMonitor(): Promise<void> {
    this.recordScreen = await this.getCapturerSource();
    const mics = await this.getAudioDevices();

    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    this.screenStream = await navigator.mediaDevices.getUserMedia({
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: this.recordScreen?.id,
        },
      },
    }) as MediaStream;

    this.micStream = await (navigator as Navigator).mediaDevices.getUserMedia({
      audio: {
        deviceId: { exact: mics[1].deviceId },
      },
    });

    const tracks =
      [...this.screenStream.getTracks(), ...this.micStream.getAudioTracks()];
    this.stream = new MediaStream(tracks);
    this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: 'video/webm' });
    this.mediaRecorder.ondataavailable = e => { this.onDataAvailable(e); };
    this.mediaRecorder.onstop = e => { void this.onStop(e); };
  }

  private onDataAvailable(e: Event): void {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    recordedChunks.push(e['data']);
  }

  // method overriding
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async onStop(e: Event): Promise<void> {
    const blob = new Blob(recordedChunks, {
      type: 'video/mp4; codecs=vp9',
    });

    const buffer = Buffer.from(await blob.arrayBuffer());

    fs.writeFile(this.filepath, buffer, () => {
      // empty
    });
    recordedChunks = [];
  }

  public start(): void {
    if (this.mediaRecorder)
      this.mediaRecorder.start();
    else
      throw new RecorderError('Failed to start recording');
  }

  public stop(filepath: string): void {
    if (this.settings.withSource) {
      this.filepath = filepath;
    } else {
      this.filepath =
        path.join(this.settings.savePath, path.basename(filepath));
    }

    if (this.mediaRecorder)
      this.mediaRecorder.stop();
    else
      throw new RecorderError('Failed to stop recording');
  }

  public pause(): void {
    if (this.mediaRecorder)
      this.mediaRecorder.pause();
    else
      throw new RecorderError('Failed to pause recording');
  }

  public continue(): void {
    if (this.mediaRecorder)
      this.mediaRecorder.resume();
    else
      throw new RecorderError('Failed to resume recording');
  }
}
