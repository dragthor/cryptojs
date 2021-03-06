const electron = require("electron");
const { dialog } = require("electron");

const { Menu, MenuItem, clipboard } = electron;

const fs = require("fs");

// Module to control application life.
const app = electron.app;

const ipc = electron.ipcMain;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Menu
const template = [
  {
    label: "File",
    role: "window",
    submenu: [
      {
        label: "Open",
        accelerator: "CmdOrCtrl+O",
        click() {
          dialog.showOpenDialog(function (fileNames) {
            if (typeof fileNames === "undefined") return;

            let file = fileNames[0];

            fs.readFile(file, "utf-8", function (err, data) {
              if (err != null) console.log(err);

              mainWindow.webContents.executeJavaScript("document.getElementById('txtInput').value = '" + data.trim() + "';");
            });

          });
        }
      },
      {
        label: "Save",
        accelerator: "CmdOrCtrl+S",
        click() {
          dialog.showSaveDialog(function (fileName) {
            if (typeof fileName === "undefined") return;

            mainWindow.webContents.executeJavaScript("document.getElementById('txtInput').value;", function (result) {
              if (typeof result === "undefined") return;
              if (result.length === 0) return;
              if (result.trim().length === 0) return;

              fs.writeFile(fileName, result.trim(), function (err) {
                if (err != null) console.log(err);
              });
            });
          });
        }
      },
      {
        role: "close"
      }
    ]
  },

  {
    label: "View",
    submenu: [
      {
        label: "Reload",
        accelerator: "CmdOrCtrl+R",
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        }
      }
    ]
  },

  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        accelerator: "CmdOrCtrl+M",
        click() { require("electron").shell.openExternal("https://github.com/dragthor/cryptojs"); }
      },

      {
        label: "Random Password",
        accelerator: "CmdOrCtrl+P",
        click() { require("electron").shell.openExternal("https://www.random.org/passwords/?num=5&len=12&format=html&rnd=new"); }
      },
    ]
  },
];

const menu = Menu.buildFromTemplate(template);

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 410, height: 530, center: true, fullscreenable: false
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  Menu.setApplicationMenu(menu);

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// ipc.on("control+C", (event, arg) => {
//   if (arg.length === 0) return;

//   clipboard.writeText(arg);
// });