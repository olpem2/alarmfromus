const notifier = require('node-notifier');
const cron = require('node-cron');

// Define the class schedule
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

// Function to display a notification
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

// Schedule the alarms
classSchedule.forEach((slot) => {
  const [hour, minute] = slot.time.split(':');
  const cronExpression = `${minute} ${hour} * * *`;

  cron.schedule(cronExpression, () => {
    displayNotification(slot.text);
  });
});
