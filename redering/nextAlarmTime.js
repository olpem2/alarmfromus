// nextAlarmTime.js
function updateNextAlarmTime() {
  const nextAlarmValueElement = document.getElementById('next-alarm-value');
  const classSchedule = [
    { time: '7:30', text: '아침식사, 세면' },
    { time: '8:00', text: '1교시' },
    { time: '9:00', text: '2교시' },
    { time: '10:00', text: '3교시' },
    { time: '11:00', text: '4교시' },
    { time: '12:00', text: '점심시간' },
    { time: '13:10', text: '5교시' },
    { time: '14:10', text: '6교시' },
    { time: '15:10', text: '7교시' },
    { time: '16:10', text: '8교시' },
    { time: '17:10', text: '9교시' },
    { time: '18:00', text: '저녁식사' },
  ];

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  let nextAlarmTime = '';
  for (const slot of classSchedule) {
    const [hour, minute] = slot.time.split(':').map(Number);
    const alarmTime = hour * 60 + minute;

    if (alarmTime > currentTime) {
      const diffMinutes = alarmTime - currentTime;
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      nextAlarmTime = `${hours}시간 ${minutes}분 후: ${slot.text}`;
      break;
    }
  }

  // 현재 스케줄이 없을 경우 다음 알람까지의 시간을 '알람이 없습니다.'로 표시
  if (!nextAlarmTime) {
    nextAlarmTime = '알람이 없습니다.';
  }

  nextAlarmValueElement.textContent = nextAlarmTime;
}

setInterval(updateNextAlarmTime, 1000);
updateNextAlarmTime();
