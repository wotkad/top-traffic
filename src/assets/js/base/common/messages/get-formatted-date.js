// Функция получения текущей даты и времени
export default function getFormattedDate() {
  let now = new Date();
  let day = now.getDate().toString().padStart(2, "0");
  let month = (now.getMonth() + 1).toString().padStart(2, "0");
  let year = now.getFullYear();
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year} в ${hours}:${minutes}`;
}