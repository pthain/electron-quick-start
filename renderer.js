// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {BrowserWindow} = require('electron').remote
const path = require('path')

const menuTestBtn = document.getElementById('menu-test-window')
let win

menuTestBtn.addEventListener('click', () => {
  win = new BrowserWindow({width: 400, height: 320})
  const htmlPath = path.join('file://',__dirname,'html_src/modal.html')

  win.on('close', () => {win = null})
  win.loadURL(htmlPath)
  win.show()
})
