const setWidth = require("./setWidth");

let width = 0;

let chunkedObj = [{}];
let chunkedObjIndex = 0;

let chunkify = (obj) => {
  for (char in obj) {
    console.log(char);
    let singleCharCount = 0;
    for (let i = obj[char]; i > 0; i--) {
      width += setWidth(char);
      if (width < 1150) {
        if (singleCharCount == 0) {
          chunkedObj[chunkedObjIndex][char] = 0;
        }
        chunkedObj[chunkedObjIndex][char]++;
      } else {
        width = setWidth(char);
        chunkedObj.push({});
        console.log(chunkedObj);
        chunkedObjIndex++;
        chunkedObj[chunkedObjIndex][char] = 0;
        chunkedObj[chunkedObjIndex][char]++;
      }
    }
  }
  return chunkedObj;
};

module.exports = chunkify;
