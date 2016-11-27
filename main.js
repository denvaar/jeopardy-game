const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const ipc = electron.ipcMain;
var dialog = electron.dialog;
var fs = require('fs');
//var app = electron.remote;
//var dialog = app.dialog;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') app.quit();
});

app.on('ready', function() {
  BrowserWindow.addDevToolsExtension("/Users/denversmith/redux-dev-tools/");
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

ipc.on('open-file-dialog', function(event, arg) {
  var path = dialog.showOpenDialog(mainWindow, { properties: ["openFile"]});
  var data = readFile(path[0]);
  event.sender.send('open-file-reply', data);
});

function readFile(path) {
  return fs.readFileSync(path, "utf-8");

}
