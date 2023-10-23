  const {app,Browserwindow} = require('electron');
const { BrowserWindow } = require('electron');

  function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height:600,
        icon:"book.ico"
    })
    win.loadFile('src/booklist.html');
  }
app.whenReady().then(createWindow);
   