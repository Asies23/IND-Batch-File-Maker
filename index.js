#! /usr/bin/env node

const { cd } = require("shelljs");
const setWidth = require("./utils/setWidth");
const chunkify = require("./utils/chunkify");
const process = require("child_process");
const rl = require("readline-sync");

let noOfPlates = rl.question("Enter the number of plates you want to cut : ");

let numbers = [];
let i = 1;

for (i = 1; i <= noOfPlates; i++) {
  numbers.push(rl.question(`Enter Number ${i}: `).toUpperCase());
}
console.log("");
console.log("The numbers are ", numbers);
console.log("");
let actionList = "";

i = 0;

let makeFiles = (i) => {
  if (i < noOfPlates) {
    console.log(`Processing File ${i + 1}`);
    let number = numbers[i];

    let input = number
      ? number.split("")
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
    alphaNumChar = charExists(alphaNumChar);

    actionList = `select-clear;file-open:IndLetters4WheelerTrial.svg;select-by-id:${charList};select-invert;delete;`;

    let chunkedAlphaNumChar = chunkify(alphaNumChar);

    let height = 300;

    for (let i = 0; i < chunkedAlphaNumChar.length; i++) {
      let obj = chunkedAlphaNumChar[i];
      let charCount = 0;
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

        if (width > 3000) {
          if (charCount > 8) {
            actionList += `selection-ungroup;`;
          }
          actionList += `select-clear;select-all:no-groups;select-clear;select-by-id:${chr};transform-translate:${
            1200 - setWidth(chr)
          },${height};select-clear;select-all:no-groups;object-align:vcenter;object-distribute:hgap;selection-group;select-clear;`;
        }
      }
      height += 300;
    }

    actionList += `select-all;fit-canvas-to-selection;select-clear;export-filename:NP/${number}.svg;export-do;file-close;file-close;quit-immediate;`;

    let command = `inkscape -g --batch-process --actions="${actionList}"`;
    cd("~/Documents/");

    let cmdExec = process.exec(command, () => {
      if (cmdExec.exitCode == 0) {
        i++;
        console.log(`Finished Processing ${number}.svg`);
        console.log("");
        makeFiles(i);
      }
    });
  } else {
    console.log(
      "All Files have been processed and are saved in ~/Documents/NP"
    );
    console.log("");
    rl.question("Press Enter to Exit ");
  }
};

makeFiles(i);
