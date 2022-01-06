const {app, Menu, BrowserView, BrowserWindow, shell} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
      contextIsolation: false
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#202124',
      symbolColor: '#595c64'
    }
  })

  mainWindow.maximize();

  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'src/index.html'),
      protocol: 'file:',
      slashes: true
  }));


  mainWindow.on('closed', () => {
      mainWindow = null;
  });
}


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.commandLine.appendSwitch('disable-features', 'CrossOriginOpenerPolicy')
