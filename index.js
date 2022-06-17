const { exec, cd, ls } = require("shelljs");
const setWidth = require("./utils/setWidth");
let chunkify = require("./utils/chunkify");

let input = process.argv[2]
  ? process.argv[2].toUpperCase().split("")
  : [
      "M",
      "H",
      "0",
      "1",
      "B",
      "K",
      "3",
      "5",
      "5",
      "8",
      "M",
      "H",
      "0",
      "4",
      "K",
      "D",
      "1",
      "1",
      "8",
      "6",
      "M",
      "H",
      "4",
      "3",
      "B",
      "Y",
      "3",
      "6",
      "3",
      "2",
    ];

let alphaNumChar = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
  G: 0,
  H: 0,
  I: 0,
  J: 0,
  K: 0,
  L: 0,
  M: 0,
  N: 0,
  O: 0,
  P: 0,
  Q: 0,
  R: 0,
  S: 0,
  T: 0,
  U: 0,
  V: 0,
  W: 0,
  X: 0,
  Y: 0,
  Z: 0,
};

let charExists = (obj) => {
  for (var i in obj) {
    if (!obj[i]) {
      delete obj[i];
    }
  }
  return obj;
};

input.forEach((char) => {
  alphaNumChar[char]++;
  alphaNumChar[char]++;
  console.log(alphaNumChar[char]);
  console.log(setWidth(char));
});

alphaNumChar = charExists(alphaNumChar);
let width = 0;

let charList = ``;
let charListCount = 0;
for (char in alphaNumChar) {
  charListCount++;
  alphaNumChar[char]--;
  width += setWidth(char);
  if (charListCount != 1) {
    charList += `,${char}`;
  } else {
    charList += `${char}`;
  }
}
console.log(charList);
alphaNumChar = charExists(alphaNumChar);

let actionList = `select-by-id:${charList};select-invert;delete;`;
console.log(actionList);

// for (char in alphaNumChar) {
//   actionList += `select-by-id:${char};`;
//   for (let i = alphaNumChar[char]; i > 0; i--) {
//     actionList += `duplicate;`;
//   }
//   actionList += `select-clear;`;
// }

console.log(alphaNumChar);

let chunkedAlphaNumChar = chunkify(alphaNumChar);

let height = 300;

for (let i = 0; i < chunkedAlphaNumChar.length; i++) {
  let obj = chunkedAlphaNumChar[i];
  let charCount = 0;
  // let width = 0;
  for (chr in obj) {
    width += setWidth(chr);
    actionList += `select-clear;select-by-id:${chr};`;
    for (let i = obj[chr]; i > 0; i--) {
      actionList += `duplicate;`;
      width += setWidth(chr);
      charCount++;
    }
    actionList += `select-clear;`;

    let wExists = obj["W"] ? true : false;
    let wCondition1 = wExists ? charCount >= 7 : charCount >= 8;
    let wCondition2 = wExists ? charCount > 7 : charCount > 8;
    console.log(width);

    if (width > 900) {
      if (charCount > 8) {
        actionList += `selection-ungroup;`;
      }
      actionList += `select-clear;select-all:no-groups;select-clear;select-by-id:${chr};transform-translate:${
        1100 - setWidth(chr)
      },${height};select-clear;select-all:no-groups;object-align:vcenter;object-distribute:hgap;selection-group;`;
    }
  }
  height += 300;
}

actionList += `select-all;fit-canvas-to-selection;`;
console.log(actionList);

let command = `inkscape IndLetters4WheelerTrial.svg -g --batch-process --actions="${actionList}" --export-filename=./NP/${process.argv[2].toUpperCase()}.svg`;
console.log(command);
cd("~/Documents/Inkscape/CLI Test/");
console.log(ls());
console.log(exec(command).stdout);
