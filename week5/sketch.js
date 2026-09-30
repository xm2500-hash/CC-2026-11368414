// 是否导出 SVG
let doExport = false;

// 随机编号
let seed = 2004;

function setup() {
  // A4 横版比例
  createCanvas(842, 595);
}

function draw() {

  // 开始导出 SVG
  if (doExport) {
    beginRecordSvg("circlePattern" + seed + ".svg");
  }

  background(255);
  noFill();
  stroke(0);

  // 固定当前随机图案
  noiseSeed(seed);

  // --------------------
  // 先画所有外圈
  // --------------------
  for (let x = 45; x < width; x += 70) {
    for (let y = 40; y < height; y += 60) {

      let noiseVal = noise(x * 0.03, y * 0.03);

      // 圆的大小在 3 到 140 之间变化
      let size = map(noiseVal, 0, 1, 3, 200);

      circle(x, y, size);
    }
  }

  // --------------------
  // 再画所有内圈
  // --------------------
  for (let x = 45; x < width; x += 70) {
    for (let y = 40; y < height; y += 60) {

      let noiseVal = noise(x * 0.03, y * 0.03);
      let size = map(noiseVal, 0, 1, 3, 140);

      // 内圈左右偏移
      let offsetX = map(
        noise(x * 0.05 + 100, y * 0.05 + 100),
        0,
        1,
        -15,
        15
      );

      // 内圈上下偏移
      let offsetY = map(
        noise(x * 0.05 + 200, y * 0.05 + 200),
        0,
        1,
        -15,
        15
      );

      // 决定这个圆有没有内圈
      let innerChance = noise(
        x * 0.08 + 300,
        y * 0.08 + 300
      );

      // 有些圆不画内圈
      if (innerChance > 0.3) {
        circle(
          x + offsetX,
          y + offsetY,
          size * 0.6
        );
      }
    }
  }

  // --------------------
  // 结束 SVG 导出
  // --------------------
  if (doExport) {
    endRecordSvg();
    doExport = false;
  }
}

function keyPressed() {

  // 按 X 生成新的随机图案a a a
  if (key === "x" || key === "X") {
    seed = floor(random(1000000));
  }

  // 按 S 保存 SVG
  if (key === "s" || key === "S") {
    doExport = true;
  }
}
