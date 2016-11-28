const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const ipc = electron.ipcMain;
var dialog = electron.dialog;
var fs = require('fs');

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') app.quit();
});

app.on('ready', function() {
  BrowserWindow.addDevToolsExtension("/Users/denversmith/redux-dev-tools/");
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  var adminWindow = new BrowserWindow({
    width: 500,
    height: 450,
    show: true
  });
  adminWindow.loadURL('file://' + __dirname + '/admin.html');
  adminWindow.openDevTools();
  ipc.on('send-answer-to-admin', function(event, args) {
    adminWindow.send('send-answer-to-admin-reply', {
      question: args.question,
      answer: args.answer,
      value: args.value
    });
  });
  ipc.on('launch-admin-pannel', function(event, args) {
    adminWindow.send('launch-admin-pannel', {
      players: args.players
    });
  });

});

ipc.on('open-file-dialog', function(event, arg) {
  var path = dialog.showOpenDialog(mainWindow, { properties: ["openFile"]});
  var data = readFile(path[0]);
  event.sender.send('open-file-reply', data);
});

ipc.on('handle-answer', function(event, args) {
  console.log(args.player);
  console.log(args.value);
  console.log(args.type);
  mainWindow.send('update-score', args);
});


function readFile(path) {
  return fs.readFileSync(path, "utf-8");
}
