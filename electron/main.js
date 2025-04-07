const { app, BrowserWindow } = require('electron')
const path = require('path')
const { spawn } = require('child_process')

let mainWindow
let pythonProcess = null

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    // Load frontend
    mainWindow.loadURL(
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../../frontend/build/index.html')}`
    )

    // Start Python backend
    if (!pythonProcess) {
        pythonProcess = spawn('python', ['app.py'], {
            cwd: path.join(__dirname, '../../backend')
        })

        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python: ${data}`)
        })
    }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (pythonProcess) pythonProcess.kill()
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})