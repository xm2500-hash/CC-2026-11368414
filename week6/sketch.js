function setup() {
  createCanvas(1000, 500);
}

function draw() {
  // 米白色背景
  background(250, 245, 235);

    // 渐变远山
  strokeWeight(2);
 for (let a = 0; a < PI / 2; a += 0.005) {
 // 左边的山
    let yLeft = 310 - 125 * cos(a);
    let widthLeft = 65 * sin(a);

    stroke(
      map(yLeft, 145, 310, 145, 250),
      map(yLeft, 145, 310, 175, 245),
      map(yLeft, 145, 310, 165, 235)
    );

    line(130 - widthLeft, yLeft,
         130 + widthLeft, yLeft);

    // 中间的山
let yMiddle = 310 - 165 * cos(a);
 let widthMiddle = 90 * sin(a);

 stroke(
      map(yMiddle, 145, 310, 145, 250),
   map(yMiddle, 145, 310, 175, 245),
     map(yMiddle, 145, 310, 165, 235)
    );

    line(250 - widthMiddle, yMiddle,
         250 + widthMiddle, yMiddle);

    // 右边的山
    let yRight = 310 - 135 * cos(a);
    let widthRight = 70 * sin(a);

    stroke(
      map(yRight, 145, 310, 145, 250),
      map(yRight, 145, 310, 175, 245),
   map(yRight, 145, 310, 165, 235)
    );

    line(370 - widthRight, yRight,
         370 + widthRight, yRight);
  }
  
// 江南白色墙面
  noStroke();
  fill(255);
  rect(110, 340, 110, 90);
  rect(265, 365, 90, 65);

   // 深灰色屋顶
  noStroke();
  fill(65, 65, 65);

  triangle(95, 340, 165, 300, 235, 340);
  triangle(250, 365, 310, 330, 370, 365);

  // 小窗户
  noStroke();
  fill(65, 65, 65);
  rect(150, 370, 25, 30);
  rect(298, 385, 22, 25);

  // 水面
  stroke(160, 200, 215);
  strokeWeight(3);
  line(105, 437, 385, 437);
  line(130, 447, 355, 447);
  

  // 北京上方的白云
  noStroke();
  fill(255);

  // 左边一朵
  circle(620, 160, 40);
  circle(650, 145, 55);
  circle(680, 160, 40);

  // 右边一朵
  circle(800, 200, 35);
  circle(825, 185, 50);
  circle(850, 200, 35);


    // 故宫：红色墙面
  noStroke();
  fill(180, 65, 55);

  rect(620, 395, 260, 35);
  rect(665, 345, 170, 50);

  // 下层金色屋顶
  fill(215, 170, 65);

  rect(655, 380, 190, 15);
  triangle(625, 395, 655, 380, 655, 395);
  triangle(845, 380, 875, 395, 845, 395);

  // 上层金色屋顶
  rect(680, 310, 140, 35);
  triangle(640, 345, 680, 310, 680, 345);
  triangle(820, 310, 860, 345, 820, 345);

  // 中间的大门
  fill(110, 45, 40);
  rect(735, 395, 30, 35);


    // 当前季节的时间
  let weatherSecond = second();

  // 雨雪下落的位置
  let weatherTime = millis();

  // 夏天：江南下雨
  if (weatherSecond >= 15 && weatherSecond < 30) {
    stroke(150, 185, 200);
    strokeWeight(2);

    for (let i = 0; i < 24; i += 1) {
      let rainX = 115 + (i * 47) % 270;
      let rainY = 100 + (weatherTime / 5 + i * 37) % 310;

      line(rainX, rainY, rainX - 4, rainY + 12);
    }
  }

  // 冬天：北京下雪
  if (weatherSecond >= 45) {
    noStroke();
    fill(255);

    for (let i = 0; i < 30; i += 1) {
      let snowX = 610 + (i * 53) % 280;
      let snowY = 100 + (weatherTime / 18 + i * 41) % 320;

      circle(snowX, snowY, 5);
    }
  }

  // 屋顶上的积雪厚度
  let snowSize = 0;

  if (weatherSecond < 15) {
    // 春天：积雪逐渐融化
    snowSize = map(weatherSecond, 0, 15, 8, 0);
  } else if (weatherSecond >= 45) {
    // 冬天：积雪逐渐增加
    snowSize = map(weatherSecond, 45, 60, 0, 8);
  }

  // 用白色线条表示屋顶积雪
  if (snowSize > 0) {
    stroke(255);
    strokeWeight(snowSize);

    // 上层屋顶
    line(640, 345, 680, 310);
    line(680, 310, 820, 310);
    line(820, 310, 860, 345);

    // 下层屋顶
    line(625, 395, 655, 380);
    line(655, 380, 845, 380);
    line(845, 380, 875, 395);
  }

  

  
  // 棕色窗框
  noFill();
  stroke(90, 60, 40);
  strokeWeight(8);

// 左边窗户
rect(40, 40, 420, 420);

// 右边窗户
rect(540, 40, 420, 420);
  
     // 窗棂
  strokeWeight(4);

  // 左窗：左上角
  line(40, 70, 100, 70);
  line(40, 100, 70, 100);
  line(70, 40, 70, 100);
  line(100, 40, 100, 70);

  // 左窗：右上角
  line(400, 70, 460, 70);
  line(430, 100, 460, 100);
  line(430, 40, 430, 100);
  line(400, 40, 400, 70);

  // 左窗：左下角
  line(40, 430, 100, 430);
  line(40, 400, 70, 400);
  line(70, 400, 70, 460);
  line(100, 430, 100, 460);

  // 左窗：右下角
  line(400, 430, 460, 430);
  line(430, 400, 460, 400);
  line(430, 400, 430, 460);
  line(400, 430, 400, 460);

  // 右窗：左上角
  line(540, 70, 600, 70);
  line(540, 100, 570, 100);
  line(570, 40, 570, 100);
  line(600, 40, 600, 70);

  // 右窗：右上角
  line(900, 70, 960, 70);
  line(930, 100, 960, 100);
  line(930, 40, 930, 100);
  line(900, 40, 900, 70);

  // 右窗：左下角
  line(540, 430, 600, 430);
  line(540, 400, 570, 400);
  line(570, 400, 570, 460);
  line(600, 430, 600, 460);

  // 右窗：右下角
  line(900, 430, 960, 430);
  line(930, 400, 960, 400);
  line(930, 400, 930, 460);
  line(900, 430, 900, 460);

    // 主树枝
  stroke(90, 60, 40);
  strokeWeight(10);

  line(40, 240, 140, 290);
line(140, 290, 280, 280);
  line(280, 280, 420, 320);
  line(420, 320, 580, 280);
  line(580, 280, 740, 300);
  line(740, 300, 860, 270);
  line(860, 270, 960, 240);

  // 小分枝
  strokeWeight(5);

  line(140, 290, 190, 240);
  line(280, 280, 320, 330);
  line(580, 280, 630, 230);
  line(740, 300, 790, 350);

  // 花朵的季节变化
  let flowerSecond = second();

    // 分钟数代表不同年份
  let flowerMinute = minute();

  // 每三年循环：小、中、大
  let yearScale = 0.8 + (flowerMinute % 3) * 0.2;

  // 花朵的大小和颜色
  let flowerSize = 0;
  let petalDistance = 0;

  let flowerR = 245;
  let flowerG = 145;
  let flowerB = 170;

  if (flowerSecond < 15) {
    // 春天：一个小圆花苞慢慢长大
    flowerSize = map(flowerSecond, 0, 15, 0, 10);
    petalDistance = 0;

  } else if (flowerSecond < 30) {
    // 夏天：花瓣展开
    flowerSize = map(flowerSecond, 15, 20, 10, 18);
    petalDistance = map(flowerSecond, 15, 20, 0, 12);

    // 第20秒之后保持盛放
    if (flowerSecond >= 20) {
      flowerSize = 18;
      petalDistance = 12;
    }

  } else if (flowerSecond < 45) {
    // 秋天：变黄，并逐渐缩小
    flowerSize = map(flowerSecond, 30, 45, 18, 0);
    petalDistance = map(flowerSecond, 30, 45, 12, 0);

    flowerR = 235;
    flowerG = 190;
    flowerB = 75;
  }

    // 根据年份调整整朵花的大小
  flowerSize = flowerSize * yearScale;
  petalDistance = petalDistance * yearScale;

  // 冬天 flowerSize 保持为0，不画花
  if (flowerSize > 0) {

    // 依次画四朵花
    for (let i = 0; i < 4; i += 1) {
      let flowerX = 190;
      let flowerY = 240;

      if (i == 1) {
        flowerX = 320;
        flowerY = 330;
      } else if (i == 2) {
        flowerX = 630;
        flowerY = 230;
      } else if (i == 3) {
        flowerX = 790;
        flowerY = 350;
      }

      noStroke();
      fill(flowerR, flowerG, flowerB);

      // 五片圆形花瓣
      circle(flowerX,
             flowerY - petalDistance,
             flowerSize);

      circle(flowerX + petalDistance,
             flowerY - petalDistance / 3,
             flowerSize);

      circle(flowerX + petalDistance / 2,
             flowerY + petalDistance,
             flowerSize);

      circle(flowerX - petalDistance / 2,
             flowerY + petalDistance,
             flowerSize);

      circle(flowerX - petalDistance,
             flowerY - petalDistance / 3,
             flowerSize);

      // 夏天和秋天才显示黄色花心
      if (flowerSecond >= 15) {
        fill(250, 210, 90);
        circle(flowerX, flowerY, flowerSize * 0.65);
      }
    }
  }

  // 读取当前秒数
  let s = second();

  // 小鸟头部的位置
  let birdX = 150;

  // 1 朝右，-1 朝左
  let direction = 1;

  if (s < 15) {
    // 春天：从左边飞到右边
    birdX = map(s, 0, 15, 150, 870);
  } else if (s < 30) {
    // 夏天：停在右边
    birdX = 870;
  } else if (s < 45) {
    // 秋天：从右边飞回左边
    birdX = map(s, 30, 45, 870, 150);
    direction = -1;
  } else {
    // 冬天：停在左边
    birdX = 150;
    direction = -1;
  }

  // 头
  noStroke();
  fill(40);
  circle(birdX, 250, 16);

  // 身体
  triangle(
    birdX, 255,
    birdX - 30 * direction, 247,
    birdX - 20 * direction, 267
  );

  // 分叉的尾巴
  stroke(40);
  strokeWeight(3);

  line(
    birdX - 25 * direction, 255,
    birdX - 40 * direction, 245
  );

  line(
    birdX - 25 * direction, 255,
    birdX - 40 * direction, 265
  );

  // 小嘴巴
  noStroke();
  fill(40);

  triangle(
    birdX + 6 * direction, 247,
    birdX + 14 * direction, 250,
    birdX + 6 * direction, 253
  );
}

