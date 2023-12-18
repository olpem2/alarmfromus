const { app, BrowserWindow } = require('electron');
const path = require('path');
// electron-reload를 초기화합니다.
require('electron-reload')(__dirname);
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

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

// 렌더러 프로세스에 시각 및 다음 알람까지 남은 시간을 전달
const sendTimeToRenderer = () => {
    const currentTime = new Date();
    const nextAlarmTime = new Date(); // 여기에 다음 알람 시간을 계산하십시오.
    const timeUntilNextAlarm = nextAlarmTime - currentTime;
    mainWindow.webContents.send('update-time', currentTime, timeUntilNextAlarm);
  };
  
  // 앱이 준비되면 시각 정보를 렌더러 프로세스에 전달
  app.whenReady().then(() => {
    createWindow();
    sendTimeToRenderer(); // 초기 시각 전달
    setInterval(sendTimeToRenderer, 1000); // 1초마다 시각 업데이트 전달
  });
  