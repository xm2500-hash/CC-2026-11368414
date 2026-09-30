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

  for (let x = 50; x < width; x += 70) {
    for (let y = 40; y < height; y += 60) {

      //根据 x 和 y 位置生成一个随机值
      let noiseVal = noise(x * 0.03, y * 0.03);

      //圆的大小在雷霆变化
      let size = map(noiseVal, 0, 1, 3, 140);

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
  //按 x 换一个新的随机图案
  if (key == "x") {
    seed = floor(random(1000000));
  }

  //按 s 保存 SVG
  if (key == "s") {
    doExport = true;
  }
}
