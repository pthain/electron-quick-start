// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

console.log("This is the renderer process!")

const {BrowserWindow} = require('electron').remote;
const path = require('path')
let win

//Get a button id'd by 'new-window' found in index.html
const newWindowBtn = document.getElementById('new-window')
const manageWindowBtn = document.getElementById('manage-window')

newWindowBtn.addEventListener('click', (event) => {
  console.log("creating new window")
  const modalPath = path.join('file://', __dirname,'html_src/modal.html')
  console.log("Path: ",modalPath)
  win = new BrowserWindow({width: 400, height: 320})

  win.on('close', () => {win = null})
  win.loadURL(modalPath)
  win.show()
})

manageWindowBtn.addEventListener('click', (event) => {
  console.log("creating manageable window")
  const modalPath = path.join('file://', __dirname,'html_src/manage-modal.html')
  console.log("Path: ",modalPath)
  win = new BrowserWindow({width: 400, height: 320})

  win.on('resize', updateReply)
  win.on('move', updateReply)
  win.on('close', () => {
    const manageWindowReply = document.getElementById('manage-window-reply')
    manageWindowReply.innerText = 'Window has been closed.'
    win = null
  })
  win.loadURL(modalPath)
  win.show()

  function updateReply() {
    const manageWindowReply = document.getElementById('manage-window-reply')
    const message = `Size: ${win.getSize()} Position: ${win.getPosition()}`
    manageWindowReply.innerText = message
  }

})
