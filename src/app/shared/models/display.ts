export interface Display {
  vendor: string;
  model: string;
  deviceName: string;
  main: boolean;
  builtin: boolean;
  connection: string;
  sizeX: number;
  sizeY: number;
  pixelDepth: number;
  resolutionX: number;
  resolutionY: number;
  currentResX: number;
  currentResY: number;
  positionX: number;
  positionY: number;
  currentRefreshRate: number;
}
