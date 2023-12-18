function updateCurrentTime() {
  const currentTimeValueElement = document.getElementById("current-time-value");
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, "0");
  const minute = now.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hour}:${minute}`;
  currentTimeValueElement.textContent = formattedTime;
}

setInterval(updateCurrentTime, 1000);
updateCurrentTime();
