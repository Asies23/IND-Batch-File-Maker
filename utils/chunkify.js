const setWidth = require("./setWidth");

let width = 0;

let chunkify = (obj) => {
  let chunkedObj = [{}];
  let chunkedObjIndex = 0;
  for (char in obj) {
    let singleCharCount = 0;
    for (let i = obj[char]; i > 0; i--) {
      width += setWidth(char);
      if (width < 1000) {
        if (singleCharCount == 0) {
          chunkedObj[chunkedObjIndex][char] = 0;
        }
        chunkedObj[chunkedObjIndex][char] += 1;
      } else {
        width = setWidth(char);
        chunkedObj.push({});
        chunkedObjIndex++;
        chunkedObj[chunkedObjIndex][char] = 0;
        chunkedObj[chunkedObjIndex][char] += 1;
      }
      singleCharCount++;
    }
  }
  return chunkedObj;
};

module.exports = chunkify;
