function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(240);
  noStroke();

  // 只要 X 还比画布小，就一直加
  for (let x = 30; x < width; x += 60) {
    for (let y = 20; y < height; y += 60) {

      // 圆的大小取决于它现在的 y 位置
      let size = y / 8;

      // 鼠标位置控制颜色
      fill(mouseX / 4, mouseY / 4, 100);

      circle(x, y, size);
    }
  }
}
