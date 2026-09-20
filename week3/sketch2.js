

function setup() {
  createCanvas(800, 800);
  noStroke();
}

function draw() {
  background(240);

  let circleSize;
//如果鼠标在Y上比400小，那动一下Y+100
  if (mouseY < 400) {
    circleSize = mouseY + 100;
    //如果反之，
    //900是因为我希望最小的圆也有100大小
  } else {
    circleSize = 900 - mouseY;
  }

  let colorChange;
//如果鼠标在 左边，把鼠标当前在 X 轴上的位置除以 4
  if (mouseX < 400) {
    colorChange = mouseX / 4;
  } else {
    colorChange = (800 - mouseX) / 4;
  }

//粉色和紫色，
  fill(180 + colorChange, 100 + colorChange, 220);

  circle(400, 400, circleSize);
}
