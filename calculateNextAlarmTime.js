// calculateNextAlarmTime.js
const classSchedule = require('./classSchedule'); // classSchedule.js를 import합니다.

function calculateNextAlarmTime() {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  let nextAlarmTime = '';
  for (const slot of classSchedule) {
    const [hour, minute] = slot.time.split(':').map(Number);
    const alarmTime = hour * 60 + minute;

    if (alarmTime > currentTime) {
      // 다음 알람까지 남은 시간을 계산합니다.
      const diffMinutes = alarmTime - currentTime;
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      nextAlarmTime = {
        time: `${hour}:${minute}`,
        text: slot.text,
        hours,
        minutes,
      };
      break;
    }
  }

  return nextAlarmTime;
}

module.exports = calculateNextAlarmTime;
