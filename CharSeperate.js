const { exec, cd } = require("shelljs");

cd("~/Documents/Inkscape/CLI Test/INDChar");

for (i = 0; i <= 9; i++) {
  console.log(
    exec(
      `inkscape ../IndLetters4WheelerTrial.svg -g --batch-process --actions="select-by-id:${i};select-invert;EditDelete;FitCanvasToDrawing;" --export-filename=${i}.svg`
    ).stdout
  );
}
