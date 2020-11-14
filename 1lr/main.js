// 3.4
const daysLeft = 100 - Number(prompt("Сколько дней прошло?"));
let end = "дней";
const daysLeftMod = daysLeft % 10;
if (daysLeftMod == 1) end = "день";
if (daysLeft > 10 && daysLeft < 20) end = "дней";
if (daysLeft > 1 && daysLeft < 5) end = "дня";
alert(`Осталось ${daysLeft} ${end}`);

// 4.6
let str = "";
for (let i = 1; i < 10; i++) {
  for (let j = 1; j < 10; j++) {
    str += i * j + " ";
  }
  str += "\n";
}
console.log(str);

//5.5
let isApproved = false;
let name;
while (!isApproved) {
  name = prompt("Ваше имя?");
  isApproved = confirm(`Ваше имя "${name}", верно?`);
}
alert(`Привет, ${name}!`);
