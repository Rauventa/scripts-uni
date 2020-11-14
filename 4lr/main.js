//1.4
const URLInput = prompt("Введите строку содержащую URL");
console.log(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,})/g.test(URLInput));
const emailInput = prompt("Введите строку содержащую Email/");
console.log(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim.test(
    emailInput
  )
);

//1.4 (translit)
let translit = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "j",
  з: "z",
  и: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ъ: "",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "ch",
  ш: "sh",
  ь: "",
  щ: "shch",
  ы: "y",
  э: "e",
  ю: "u",
  я: "ya"
};
const str = prompt("Введите вашу строку для перевода в транслит");
if (!str || str.length === 0) alert("Ошибка: строка пустая.");
let result = [];
for (var i = 0; i < str.length; ++i) {
  result.push(
    translit[str[i]] ||
      (!translit[str[i].toLowerCase()] && str[i]) ||
      translit[str[i].toLowerCase()].replace(/^(.)/, m => m.toUpperCase())
  );
}
console.log(result.join(""));
