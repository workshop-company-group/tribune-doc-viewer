import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as drivelist from 'electron-drivelist';
import * as url from 'url';

let win: BrowserWindow;
let externalWin: BrowserWindow;

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
      allowRunningInsecureContent: !!(serve),
      // eslint-disable-next-line max-len
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      // eslint-disable-next-line max-len
      enableRemoteModule: true, // true if you want to run 2e2 test with Spectron or use remote module in renderer context (ie. Angular)
    },
  });
  win.webContents.openDevTools();
  void win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  win.on('closed', () => {
    app.quit();
  });
  return win;
}

function createExternalWindow(id: number): BrowserWindow {
  const electronScreen = screen;
  const displays = electronScreen.getAllDisplays();
  const externalDisplay = displays.find(display =>
    display.id === id,
  );

  if (externalDisplay) {
    externalWin = new BrowserWindow({
      x: externalDisplay.bounds.x,
      y: externalDisplay.bounds.y,
      fullscreen: true,
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: !!(serve),
        contextIsolation: false,  // false for 2e2 test with Spectron
        enableRemoteModule: true, // true for 2e2 test with Spectron
        // or use remote module in renderer context (ie. Angular)
      },
    });
    externalWin.webContents.openDevTools();
    void externalWin.loadURL(url.format({
      pathname: path.join(__dirname, 'src/external/external.html'),
      protocol: 'file:',
      slashes: true,
    }));
    // .then(() => { isExternalWinCreated.next(); });

    externalWin.on('closed', () => {
      // externalWin.webContents.send('reset-pdf');
    });
  }

  return externalWin;
}

const CREATE_WINDOW_TIMEOUT = 400;
const PROMISE_TIMEOUT = 2000;
try {
  app.disableHardwareAcceleration();
  app.commandLine.appendSwitch('js-flags', '--max-old-space-size=4096');
  app.on('ready', () => setTimeout(createWindow, CREATE_WINDOW_TIMEOUT));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin') {
    //   app.quit();
    // }
    app.quit();
  });

  app.on('activate', () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!win) {
      createWindow();
    }
  });

  // Quit app on signal
  ipcMain.on('app-exit', () => app.quit());

  // Create new window on signal
  ipcMain.handle('external-window', async (event, arg) => {

    createExternalWindow(arg);
    const promise1 = new Promise(resolve => {
      setTimeout(() => {
        resolve('foo');
      }, PROMISE_TIMEOUT);
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
  // eslint-disable-next-line no-return-await
  ipcMain.handle('drive-list', async () => await drivelist.list());

} catch (e) {
  // Catch Error
  // throw e;
}
