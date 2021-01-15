[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)

## Getting Started

Install dependencies with npm :

``` bash
npm install
```


If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.

``` bash
npm install -g @angular/cli
```

## To build for development

- **in a terminal window** -> `npm start`

The application code is managed by `main.ts`. 
You can disable "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

## Use Electron / NodeJS / 3rd party libraries

Sample project runs on both mode (web and electron). 
To make this happen, **you have to import your dependencies the right way**. 
Please check `providers/electron.service.ts` to watch how conditional import 
of libraries has to be done when using electron / NodeJS / 3rd party 
librairies in renderer context (i. e. Angular).

## Browser mode

To execute the application in the browser with hot reload run `npm run ng:serve:web`.

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:build`| Builds your application and creates an app consumable based on your operating system |

**Your application is optimised. Only /dist folder and node dependencies are included in the executable.**

## You want to use a specific lib (like rxjs) in electron main thread ?

Import library in npm dependencies section (not **devDependencies**) with `npm install --save`. 
It will be loaded by electron during build phase and added to your final package. 
Then use your library by importing it in `main.ts` file.
