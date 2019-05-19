// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

console.log("This is the renderer process!")

const {BrowserWindow} = require('electron').remote;
const path = require('path')

//Get a button id'd by 'new-window' found in index.html
const newWindowBtn = document.getElementById('new-window')

newWindowBtn.addEventListener('click', (event) => {
  console.log("Creating a new window (because you pressed a button)")
  const modalPath = path.join('file://', __dirname,'modal.html')
  console.log("Path: ",modalPath)
  let win = new BrowserWindow({width: 400, height: 320})

  win.on('close', () => {win = null})
  win.loadURL(modalPath)
  win.show()
})
