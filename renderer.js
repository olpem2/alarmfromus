// renderer.js
import { updateCurrentTime } from './redering/currentTime.js';
import { updateNextAlarmTime } from './redering/nextAlarmTime.js';

updateCurrentTime();
updateNextAlarmTime();
// renderer.js

// renderer.js
import { updateCurrentTime } from './redering/currentTime.js';
import { updateNextAlarmTime } from './redering/nextAlarmTime.js';

updateCurrentTime();
updateNextAlarmTime();

// "speak" 버튼 클릭 이벤트 핸들러
document.getElementById('speak-button').addEventListener('click', () => {
  const nextAlarm = calculateNextAlarmTime();
  if (nextAlarm) {
    const currentTime = new Date();
    const currentTimeString = `${currentTime.getHours()}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
    const nextAlarmString = `${nextAlarm.time} ${nextAlarm.text}, ${nextAlarm.remainingMinutes} minutes until next alarm.`;
    const speechText = `Now time is ${currentTimeString}, it's ${nextAlarmString}`;

    // 새 창을 열고 음성 출력
    const newWindow = window.open('', 'AlarmSpeechWindow', 'width=400,height=200');
    newWindow.document.write(`<p>${speechText}</p>`);
    newWindow.speechSynthesis.speak(new SpeechSynthesisUtterance(speechText));
  } else {
    alert('There is no next alarm.');
  }
});
