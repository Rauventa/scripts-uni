//1.7
const isPalindrome = str => {
  str = str.toLowerCase().replace(/\s/g, "");
  return (
    str ===
    str
      .split("")
      .reverse()
      .join("")
  );
};
console.log(isPalindrome("комок"), isPalindrome("dfd343terdsf?"));

//1.8
const arr = [0, -11, 11, 1, 12, 2, 0.1, 1.1, 22, 3, 100];
const sortedArr = arr.sort((a, b) => b - a);
console.log(sortedArr);

//1.9
const theMostNestedArray = [[[3], [0]], [5], -1];
const clonedNestedArray = JSON.parse(JSON.stringify(theMostNestedArray));
console.log(theMostNestedArray, clonedNestedArray);
