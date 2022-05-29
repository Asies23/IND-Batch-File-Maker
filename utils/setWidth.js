const setWidth = function (char) {
  let width = 123.567;
  switch (char) {
    case "I":
      width = 35.241;
      break;
    case "1":
      width = 74.706;
      break;
    case "W":
      width = 132.963;
      break;
    default:
      break;
  }
  return width;
};

module.exports = setWidth;
