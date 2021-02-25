import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import { electron } from 'process';
import * as url from 'url';

let win: BrowserWindow = null;
let externalWin: BrowserWindow = null;

const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule : true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
  });

  win.webContents.openDevTools();
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', () => {
    app.quit();
  });

  return win;
}

function createExternalWindow(): BrowserWindow {
  const electronScreen = screen;
  const displays = electronScreen.getAllDisplays()
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  if (externalDisplay) {
    externalWin = new BrowserWindow({
      x: externalDisplay.bounds.x,
      y: externalDisplay.bounds.y,
      fullscreen: true,
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: (serve) ? true : false,
        contextIsolation: false,  // false if you want to run 2e2 test with Spectron
        enableRemoteModule : true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
      },
    });

    externalWin.webContents.openDevTools();
    externalWin.loadURL(url.format({
      pathname: path.join(__dirname, 'src/external.html'),
      protocol: 'file:',
      slashes: true
    }));

    externalWin.on('closed', () => {
      externalWin.webContents.send('reset-pdf');
    })
  }

  return externalWin
}

try {
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });

  // Quit app on signal
  ipcMain.on('app-exit', () => app.quit());

  // Create new window on signal
  ipcMain.on('external-window', () => {
    createExternalWindow();
  });

  // Closes the window on external monitor on signal
  ipcMain.on('close-external-window', () => {
    externalWin.close();
  });

  ipcMain.on('set-pdf', (event, arg) => {
    externalWin.webContents.send('set-pdf', arg);
  });

  ipcMain.on('next-page', () => {
    externalWin.webContents.send('next-page');
  });

  ipcMain.on('previous-page', () => {
    externalWin.webContents.send('previous-page');
  });

  ipcMain.on('set-page', (event, arg) => {
    externalWin.webContents.send('set-page', arg);
  });

} catch (e) {
  // Catch Error
  // throw e;
}