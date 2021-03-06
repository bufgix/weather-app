import { app, BrowserWindow, ipcMain } from 'electron'
import fs from "fs";
import path from "path";

const DB_FILE = path.join(app.getPath('appData'), "weather-db.json")

ipcMain.on('saveCity', (event, arg) => {
  let dbData = {
    city: arg
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(dbData));

})

ipcMain.on('loadCity', (event, arg) => {
  if (fs.existsSync(DB_FILE)){
    fs.readFile(DB_FILE, (err, data) => {
      event.sender.send("loadCity", JSON.parse(data).city);
    })
    
  }else {
    event.sender.send("loadCity", false);
  }
})
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 770,
    useContentSize: true,
    width: 560,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
    }, 
  })
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
