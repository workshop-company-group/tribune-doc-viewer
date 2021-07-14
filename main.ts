import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import { electron } from 'process';
import { Subject } from 'rxjs';
import * as drivelist from 'electron-drivelist';
import * as url from 'url';

let win: BrowserWindow = null;
let externalWin: BrowserWindow = null;
// let isExternalWinCreated: Subject<void> = new Subject();

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

function createExternalWindow(id: number): BrowserWindow {
  const electronScreen = screen;
  const displays = electronScreen.getAllDisplays()
  const externalDisplay = displays.find((display) => {
    // return display.bounds.x !== 0 || display.bounds.y !== 0
    return display.id === id;
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
    console.log('cleared');
    externalWin.webContents.openDevTools();
    externalWin.loadURL(url.format({
      pathname: path.join(__dirname, 'src/external/external.html'),
      protocol: 'file:',
      slashes: true
    }))
      // .then(() => { isExternalWinCreated.next(); });

    externalWin.on('closed', () => {
      // externalWin.webContents.send('reset-pdf');
    })
  }

  return externalWin;
}

// function isExternalMonitorAvailable(): boolean {
//   const displays = screen.getAllDisplays();
//   console.log('all: ', displays);
//   // console.log('requested: ');
//   const externalDisplay = displays.find((display) => {
//     return display.bounds.x !== 0 || display.bounds.y !== 0
//   });
//   return externalDisplay ? true : false;
// }

try {
  app.disableHardwareAcceleration();
  app.commandLine.appendSwitch('js-flags', '--max-old-space-size=4096');
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin') {
    //   app.quit();
    // }
    app.quit();
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });

  // Quit app on signal
  ipcMain.on('app-exit', () => app.quit());

  // Create new window on signal
  ipcMain.handle('external-window', async (event, arg) => {

    createExternalWindow(arg);
    const promise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('foo');
      }, 2000);
    });
    await promise1;
    // await isExternalWinCreated.toPromise();
    return true;
  });

  // Closes the window on external monitor on signal
  ipcMain.on('close-external-window', () => {
    externalWin.close();
  });

  // Sets pdf on external screen by path
  ipcMain.on('set-pdf', (event, arg) => {
    externalWin.webContents.send('set-pdf', arg);
  });

  // Changes the page to the next one
  ipcMain.on('next-page', () => {
    externalWin.webContents.send('next-page');
  });

  // Changes the page to the next one
  ipcMain.on('previous-page', () => {
    externalWin.webContents.send('previous-page');
  });

  // Changes the page to one which is stated in argument
  ipcMain.on('set-page', (event, arg) => {
    externalWin.webContents.send('set-page', arg);
  });

  // Returns list of drives
  ipcMain.handle('drive-list', async (event, arg) => {
    return await drivelist.list();
  });

} catch (e) {
  // Catch Error
  // throw e;
}
