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
//固定鼠标
  let maxSize = 58;
//鼠标在最左边是50，在右边是80？
for (let x = 50; x < width; x += 70) {
for (let y = 40; y < height; y += 60) {
//
let size = map(y, 40, height, 30, maxSize);
//x 和 y 位置生成一个随机 
let noiseVal = noise(x * 0.01, y * 0.01);
size = size + noiseVal * 5;

circle(x, y, size);
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
  //X变化，
  if (key == "x") {
    seed = floor(random(2004041));
  }
//S 保存
  if (key == "s") {
    doExport = true;
  }
}
