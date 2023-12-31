
function speakAlarm(currentTime, nextAlarm) {
    const currentTimeString = `${currentTime.getHours()}시 ${currentTime.getMinutes()}분`;
    const nextAlarmString = `${nextAlarm.hours}시 ${nextAlarm.minutes}분`;
  
    // 새 창을 열고 음성 메시지를 출력합니다.
    const newWindow = window.open('', 'AlarmSpeechWindow', 'width=400,height=200');
    const speechText = `현재 시각은 ${currentTimeString}, 다음 알람 ${nextAlarm.text}은 ${nextAlarmString} 남았습니다.`;
    newWindow.document.write(`<p>${speechText}</p>`);
    newWindow.speechSynthesis.speak(new SpeechSynthesisUtterance(speechText));
  }
  
  module.exports = speakAlarm;