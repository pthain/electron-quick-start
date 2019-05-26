// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

console.log("This is the renderer process!")

const {BrowserWindow, dialog} = require('electron').remote;
const path = require('path')

//Get a button id'd by 'new-window' found in index.html
const newWindowBtn = document.getElementById('new-window')
const manageWindowBtn = document.getElementById('manage-window')
const blurWindowBtn = document.getElementById('blur-window')
const focusBtn = document.getElementById('focus-on-modal')
const framelessBtn = document.getElementById('frameless-window')
const crashBtn = document.getElementById('crash-window')

newWindowBtn.addEventListener('click', (event) => {
  console.log("creating new window")
  const modalPath = path.join('file://', __dirname,'html_src/modal.html')
  console.log("Path: ",modalPath)
  let win = new BrowserWindow({width: 400, height: 320})

  win.on('close', () => {win = null})
  win.loadURL(modalPath)
  win.show()
})

manageWindowBtn.addEventListener('click', (event) => {
  console.log("creating manageable window")
  const modalPath = path.join('file://', __dirname,'html_src/manage-modal.html')
  console.log("Path: ",modalPath)
  let win = new BrowserWindow({width: 400, height: 320})

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

blurWindowBtn.addEventListener('click', (event) => {
  console.log("Create a window for blurring/focusing")
  const modalPath = path.join('file://',__dirname,'html_src/modal-toggle-visibility.html')
  let win = new BrowserWindow({width: 600, height: 400})

  win.on('focus', hideFocusBtn)
  win.on('blur', showFocusBtn)
  win.on('close', () => {
    hideFocusBtn()
    win = null
  })

  function hideFocusBtn() {
    console.log("Attempt to hide the focus button")
    focusBtn.classList.add('disappear')
    focusBtn.classList.remove('smooth-appear')
    focusBtn.removeEventListener('click', clickHandler)
  }

  function showFocusBtn(btn) {
    console.log("Attempt to show the focus button")
    if (!win) return
    focusBtn.classList.add('smooth-appear')
    focusBtn.classList.remove('disappear')
    focusBtn.addEventListener('click', clickHandler)

  }

  function clickHandler () {
    win.focus()
  }

  win.loadURL(modalPath)
  win.show()
})


framelessBtn.addEventListener('click', (event) => {
  console.log("Creating a framless window...")
  const modalPath = path.join('file://', __dirname,'html_src/modal.html')
  let win = new BrowserWindow({frame: false, width: 600, height: 600 })

  win.on('close', () => {win = null})
  win.loadURL(modalPath)
  win.show()
})

crashBtn.addEventListener('click', (event) => {
  console.log("crash testing...")
  const modalPath = path.join('file://', __dirname,'html_src/process-crash.html')
  console.log("Path: ",modalPath)
  let win = new BrowserWindow({width: 400, height: 320})
  win.on('crashed', () => {
    const options = {
      type: 'info',
      title: 'Renderer Process Crashed',
      message: 'This process has crashed!',
      buttons: ['Reload', 'Send Message', 'Close']
    }

    dialog.showMessageBox(options, (index) => {
      if (index === 0) win.reload()
      else if (index === 1) console.log('Message sent to console!')
      else win.close
    })
  })

  win.on('close', () => {win = null})
  win.loadURL(modalPath)
  win.show()
})
