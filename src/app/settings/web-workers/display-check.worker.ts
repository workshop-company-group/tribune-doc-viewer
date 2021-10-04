/// <reference lib="webworker" />

import * as si from 'systeminformation';

import { Display } from '../../shared/models/display';

addEventListener('message', (message) => {
  onMessage(message)
});

async function onMessage(message): Promise<void> {
  const displays = await getDisplays();
  postMessage(JSON.stringify(displays));
}

async function getDisplays(): Promise<Display[]> {
  const graphics = await si.graphics();
  return graphics.displays;
}
