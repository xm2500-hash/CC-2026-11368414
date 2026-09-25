function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  
}

function draw() {
  background(240);
  //让方块横着重复

  for (let x = 100; x < width; x += 120) {

    push();

    translate(x, 400);
//方块跟着旋转
    let squareSize = mouseY / 4 + 50;

    rotate(mouseX / 300);
    fill(100, 150, 255);
    
noStroke();
    rect(0, 0, squareSize);

    pop();
  }
}
