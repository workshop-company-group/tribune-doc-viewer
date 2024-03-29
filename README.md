# Tribune Document Viewer

Document viewer for touchscreen interactive tribunes

[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) 
[![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)

## Getting Started

Install dependencies with npm :

``` bash
npm install
```

### PDF.js

Version `2.5.207` should be used for `pdfjs-dist` package. 
[Reason](https://github.com/VadimDez/ng2-pdf-viewer/issues/717#issuecomment-776115196) 
is described in [this issue](https://github.com/VadimDez/ng2-pdf-viewer/issues/717).

## Development

Install Angular-cli to be able to generate Angular components.
``` bash
npm install -g @angular/cli
```

The application code is managed by `main.ts`. 
You can disable "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

### Generating Angular components/services/directives

This project does not generate components/services/directives with test file 
(`.spec`). If test file is required use flag `--skip-tests=false`.

**All components are generated with OnPush change detection strategy by default.**

### Build

```bash
npm start
```

|Command|Description|
|--|--|
|`npm run build`| Build the app. Your built files are in the /dist folder. |

### Run

|Command|Description|
|--|--|
|`npm run ng:serve`| Execute the app in the browser |
|`npm run ng:serve:web`| Execute the app in the browser with hot reload |
|`npm run electron:local`| Builds your application and start electron |

## Production

|Command|Description|
|--|--|
|`npm run electron:build`| Build and create an app consumable based on your operating system |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |

## Based on
* [maximegrix/angular-electron](https://github.com/maximegris/angular-electron)
