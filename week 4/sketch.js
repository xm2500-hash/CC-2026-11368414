let saveSvg = false;

function setup() {
  createCanvas(576, 384);
}

function draw() {
  background(255);
  noFill();
  randomSeed(10);

  if (saveSvg) {
    beginRecordSvg("circlePattern.svg");
  }

  let maxSize = map(mouseX, 0, width, 50, 80);

  for (let x = 50; x < width; x += 80) {
    for (let y = 40; y < height; y += 60) {

      let size = map(y, 40, height, 30, maxSize);

      stroke(0);

      circle(x, y, size);
      circle(x, y, size * 0.6);
    }
  }

  if (saveSvg) {
    endRecordSvg();
    saveSvg = false;
  }
}

function keyPressed() {
  if (key == 's') {
    saveSvg = true;
  }
}
