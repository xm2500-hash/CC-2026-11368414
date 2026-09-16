
let clickCount = 0;
//外圈花朵的颜色
let flowerR = 0;
let flowerG = 1;
let flowerB = 2;

function setup() {
  createCanvas(600, 600);
}
//背景颜色
function draw() {
  if (clickCount === 0) {
    background(30, 40, 80)
  } 
else if (clickCount === 1) {
    background(50, 70, 110)
  } 
else if (clickCount === 2) {
    background(70, 100, 150)
  } else if (clickCount === 3) {
    background(90, 140, 190)
  } 
else if (clickCount === 4) {
    background(120, 180, 220)
  } 
  else if (clickCount === 5) {
    background(170, 220, 245)
  }
//月亮
  if (clickCount === 0) {
fill(180, 220, 255)
circle(120, 120, 90);
  }
  //if (clickCount >0) {
  //noStrokw()
  //
 // }
  
//太阳
  //if clickCount = 0 nonono
  if (clickCount === 1) {
  push();
  translate(40, 570);
  noStroke();
  fill(255, 210, 70);
  circle(0, 0, 80);
  pop();
} else if (clickCount === 2) {
  push();
  translate(60, 470);
  noStroke();
  fill(255, 210, 70);
  circle(0, 0, 90);
  pop();
} else if (clickCount === 3) {
  push();
  translate(80, 350);
  noStroke()
  fill(255, 210, 70);
  circle(0, 0, 100);
  pop();
} else if (clickCount === 4) {
  push();
  translate(100, 220);
  noStroke();
  fill(255, 210, 70);
  circle(0, 0, 110);
  pop();
} else if (clickCount === 5) {
  push();
  translate(120, 110);
  noStroke();
  fill(255, 210, 70);
  circle(0, 0, 120);
  pop();
  }
//叶子
  if (clickCount > 0) {
    push();
    translate(450, 330);

    stroke(55, 130, 70);//小绿
    strokeWeight(8);
    line(0, 30, 0, 230);//起点X, 起点Y, 终点X, 终点Y

    noStroke();
    fill(70, 160, 80);
    //第一个点X, 第一个点Y,
 // 第二个点X, 第二个点Y,
 // 第三个点X, 第三个点Y
    triangle(0, 110, -70, 75, -10, 140);
    triangle(0, 145, 70, 105, 10, 175);

    pop();
  }
//外面的花瓣
  if (clickCount > 0) {
    let flowerSize = 100;

    if (clickCount === 1) {
      flowerSize = 100;
    } else if (clickCount === 2) {
      flowerSize = 120;
    } else if (clickCount === 3) {
      flowerSize = 150;
    } else if (clickCount === 4) {
      flowerSize = 180;
    } else if (clickCount === 5) {
      flowerSize = 200;
    }
//花的颜色
    push();
    translate(450, 330);

    noStroke();
    fill(flowerR, flowerG, flowerB);
    circle(0, 0, flowerSize);
// 中间的花心
    fill(255, 190, 50);
    circle(0, 0, 60)

    pop();
  }
//鸟
  if (clickCount > 0) {
    stroke(30, 30, 40);
    strokeWeight(5);

    if (clickCount === 1) {
      push();
      translate(540, 100);
      line(-20, 0, 0, 15);
      line(0, 15, 20, 0);
      pop();
    } else if (clickCount === 2) {
      push();
      translate(450, 130);
      line(-20, 0, 0, 15);
    
      pop();
    } else if (clickCount === 3) {
      push();
      translate(350, 160);
      line(-20, 0, 0, 15);
      line(0, 15, 20, 0);
      pop();
    } else if (clickCount === 4) {
      push();
      translate(250, 140);
      line(-20, 0, 0, 15);
      pop();
    } else if (clickCount === 5) {
      push();
      translate(190, 110);
      line(-20, 0, 0, 15);
      line(0, 15, 20, 0);
      pop();
    }
  }
}
//随机颜色
function mousePressed() {
  clickCount = clickCount + 1;

  if (clickCount > 5) {
    clickCount = 0;
  }

  if (clickCount > 0) {
    flowerR = random(0, 255);
    flowerG = random(0, 255);
    flowerB = random(0, 255);
  }
}
