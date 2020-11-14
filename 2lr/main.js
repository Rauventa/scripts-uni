//1.4-5
let arr = [];
for (let i = 0; i <= 10; i++) {
  arr[i] = [];
  for (let j = 0; j <= 10; j++) {
    arr[i][j] = i * j;
  }
}
console.log(arr);
console.log(arr[5][5]);

//1.3
let isValidated = false;
let input;
while (!isValidated) {
  input = prompt("Ваша строка");
  if (input && input.length != 0 && input.includes(";")) isValidated = true;
}
let elements = input.split(";").filter(str => str.length > 0);
elements.forEach(el => {
  document.write(`<p>${el}</p>`);
});
