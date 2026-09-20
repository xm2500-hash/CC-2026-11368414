
<<<<<<< HEAD

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  
=======
function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(240);
 noStroke();
  //只要X还比画布小，就一直加
  for (let x = 30; x < width; x += 60) {
    for (let y = 20; y < height; y += 60) {
//圆的大小取决于它现在的 y 位置。
      let size = y / 8;
//从左到右的变化
      fill(mouseX / 4, mouseY / 4, 100);

      circle(x, y, size);
    }
  }
>>>>>>> c498b1d6bf0d55633a6a27b11e0ecfa8512b2391
}
