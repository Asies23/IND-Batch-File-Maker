const { exec, cd } = require("shelljs");
const setWidth = require("./utils/setWidth");

let input = process.argv[2].toUpperCase().split("");

input.forEach((char) => {
  console.log(setWidth(char));
});

console.log(input);
