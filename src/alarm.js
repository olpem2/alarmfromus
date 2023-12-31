const notifier = require('node-notifier');
const cron = require('node-cron');
const classSchedule = require('./classSchedule');

// 알람 출력
const displayNotification = (text) => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

  notifier.notify({
    title: '알람',
    message: `지금은 ${formattedTime}, ${text}이 시작되었습니다.`,
  });
};

// 알람 스케쥴 
classSchedule.forEach((slot) => {
  const [hour, minute] = slot.time.split(':');
  const cronExpression = `${minute} ${hour} * * *`;

  cron.schedule(cronExpression, () => {
    displayNotification(slot.text);
  });
});
