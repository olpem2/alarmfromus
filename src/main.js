const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const calculateNextAlarmTime = require('../calculateNextAlarmTime');
const speakAlarm = require('../speakAlarm'); // speakAlarm.js를 import합니다.

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  ipcMain.on('speak-alarm', (event) => {
    const nextAlarmTime = calculateNextAlarmTime();
    if (nextAlarmTime && typeof nextAlarmTime !== 'string') {
      const currentTime = new Date();
      const currentTimeString = `${currentTime.getHours()}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
      
      // speakAlarm 모듈을 사용하여 음성 메시지를 출력합니다.
      speakAlarm(currentTime, nextAlarmTime);

      event.reply('speak-alarm-response', 'Alarm spoken.'); // 음성 출력이 완료되었다는 메시지 전달
    } else {
      event.reply('speak-alarm-response', 'There is no next alarm.');
    }
  });

  setInterval(sendTimeToRenderer, 1000);
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function sendTimeToRenderer() {
  const currentTime = new Date();
  const nextAlarmTime = calculateNextAlarmTime();

  mainWindow.webContents.send('update-time', currentTime, nextAlarmTime);
}
