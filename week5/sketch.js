//先不要导出 SVG
let doExport = false;

//编号
let seed = 2004;

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

  //先画所有外圈
for (let x = 50; x < width; x += 70) {
  for (let y = 40; y < height; y += 60) {

    let noiseVal = noise(x * 0.03, y * 0.03);
    let size = map(noiseVal, 0, 1, 3, 140);

    circle(x, y, size);
  }
}

//再画所有内圈
for (let x = 50; x < width; x += 70) {
  for (let y = 40; y < height; y += 60) {

    let noiseVal = noise(x * 0.03, y * 0.03);
    let size = map(noiseVal, 0, 1, 3, 140);

    circle(x, y, size * 0.6);
  }
}

  //结束画画
  if (doExport) {
    endRecordSvg();
    doExport = false;
  }
}

function keyPressed() {
  if (key === "x" || key === "X") {
    seed = floor(random(1000000));
  }

  if (key === "s" || key === "S") {
    doExport = true;
  }
}
