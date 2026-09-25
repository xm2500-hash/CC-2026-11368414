let doExport = false;
let seed = 8199;

function setup() {
  createCanvas(576, 384);
}

function draw() {

  if (doExport) {
    beginRecordSvg("circlePattern" + seed + ".svg");
  }

  background(255);
  noFill();
  stroke(0);

  noiseSeed(seed);

  let maxSize = map(mouseX, 0, width, 50, 80);

  for (let x = 50; x < width; x += 80) {
    for (let y = 40; y < height; y += 60) {

      let size = map(y, 40, height, 30, maxSize);

      let noiseVal = noise(x * 0.01, y * 0.01);
      size = size + noiseVal * 10;

      circle(x, y, size);
      circle(x, y, size * 0.6);
    }
  }

  if (doExport) {
    endRecordSvg();
    doExport = false;
  }
}

function keyPressed() {

  if (key == "r") {
    seed = floor(random(2004041));
  }

  if (key == "s") {
    doExport = true;
  }
}
