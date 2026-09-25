function setup() {
  createCanvas(576, 384);
}

function draw() {
  background(255);
  noFill();
  randomSeed(10);

  let maxSize = map(mouseX, 0, width, 50, 80);

  for (let x = 50; x < width; x += 80) {
  for (let y = 40; y < height; y += 60) {

  let size = map(y, 40, height, 30, maxSize);
//随机颜色
  stroke(random(255), random(255), random(255));

      circle(x, y, size);
      circle(x, y, size * 0.6);
    }
  }
}
