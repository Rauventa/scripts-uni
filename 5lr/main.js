function setCurrentTime() {
  const now = new Date();

  const day = toFixedLength(now.getDate());
  const month = toFixedLength(now.getMonth() + 1);
  const year = now.getFullYear();

  const hours = toFixedLength(now.getHours());
  const minutes = toFixedLength(now.getMinutes());
  const seconds = toFixedLength(now.getSeconds());

  const $clock = document.getElementById("clock");
  $clock.innerHTML = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

  setTimeout(setCurrentTime, 1000);
}
function toFixedLength(num) {
  return num > 9 ? num : `0${num}`;
}
window.onload = function() {
  setCurrentTime();
};
