let pMapper;

// 三个投影面
let quad1;
let quad2;
let quad3;
// 每个面的尺寸
let quadSize = 400;
// 第一个面要用到的变量
// 月牙的位置
let moonX;
let moonY;
// 月牙移动速度
let moonSpeedX;
let moonSpeedY;
// 云海圆形数据
let cloudCircles = [];
let numCloudCircles = 45;
// 第二个面要用到的变量
// 星星数组
let beijingStars = [];
let numBeijingStars = 35;
function setup() {
// 创建 WEBGL 画布
    createCanvas(windowWidth, windowHeight, WEBGL);
 // 创建投影映射工具
    pMapper = createProjectionMapper(this);
    // 创建三个投影面
    quad1 = pMapper.createQuadMap(quadSize, quadSize);
    quad2 = pMapper.createQuadMap(quadSize, quadSize);
    quad3 = pMapper.createQuadMap(quadSize, quadSize);

    // 初始化第一个面的月牙
    
    moonX = 200;
    moonY = 120;

    // 月牙移动速度
    moonSpeedX = 2.2;
    moonSpeedY = 1.8;


    // 初始化第一个面的云海圆形
  
    for (let i = 0; i < numCloudCircles; i++) {
        let oneCircle = {
            // 主要集中在左下区域
            x: random(20, 220),
            y: random(220, 390),

            // 圆的大小
            size: random(35, 95),

            // 给每个圆一个轻微漂浮节奏
            offset: random(TWO_PI)
        };
        cloudCircles.push(oneCircle);
    }

    // 初始化第二个面的星星
 
    for (let i = 0; i < numBeijingStars; i++) {
        let oneStar = {
            x: random(20, 380),
            y: random(20, 200),
            size: random(6, 13),
            offset: random(TWO_PI),
            twinkleSpeed: random(0.02, 0.05)
        };
        beijingStars.push(oneStar);
    }
}














function draw() {
    // 整个主画布背景设为黑色
    background(0);

    // 三个面分别显示自己的动画
    quad1.displaySketch(drawFace1);
    quad2.displaySketch(drawFace2);
    quad3.displaySketch(drawFace3);
}

// 第一个面：梦幻天空 + 左下角云海 + 会反弹的月牙

function drawFace1(pg) {

    // ------------------------------
    // 1. 画更深一点的梦幻天空渐变
    // ------------------------------
    for (let y = 0; y < quadSize; y++) {

        let t = map(y, 0, quadSize, 0, 1);

        // 顶部颜色：更深的紫蓝
        let topR = 45;
        let topG = 34;
        let topB = 92;

        // 底部颜色：更深的粉紫
        let bottomR = 210;
        let bottomG = 150;
        let bottomB = 205;

        let r = lerp(topR, bottomR, t);
        let g = lerp(topG, bottomG, t);
        let b = lerp(topB, bottomB, t);

        pg.stroke(r, g, b);
        pg.line(0, y, quadSize, y);
    }
    // 2. 小星星

    pg.noStroke();

    for (let i = 0; i < 18; i++) {
        let starX = (i * 37) % quadSize;
        let starY = (i * 57) % 180;

        let twinkle = map(
            sin(frameCount * 0.03 + i),
            -1, 1,
            70, 190
        );

        pg.fill(255, 230, 250, twinkle * 0.18);
        pg.circle(starX, starY, 8);

        pg.fill(255, 245, 255, twinkle);
        pg.circle(starX, starY, 3);
    }

    // 3. 左下角粉紫色云海

    for (let i = 0; i < cloudCircles.length; i++) {
        let c = cloudCircles[i];

        let floatingY = c.y + sin(frameCount * 0.02 + c.offset) * 6;

        pg.noStroke();
        pg.fill(240, 170, 220, 42);
        pg.circle(c.x, floatingY, c.size * 1.25);

        pg.fill(185, 135, 220, 82);
        pg.circle(c.x, floatingY, c.size);

        pg.fill(235, 180, 210, 50);
        pg.circle(c.x + 10, floatingY - 6, c.size * 0.72);
    }

    // 左下额外厚一点的云层
    pg.noStroke();
    pg.fill(240, 185, 220, 65);
    pg.circle(70, 340, 130);
    pg.circle(120, 360, 140);
    pg.circle(180, 345, 150);
    pg.circle(90, 390, 150);
    pg.circle(180, 395, 170);

    pg.fill(180, 135, 220, 60);
    pg.circle(35, 380, 120);
    pg.circle(150, 390, 120);
    pg.circle(220, 380, 130);
    
    // 4. 画更深一点的月牙
    
    drawCrescentMoon(pg, moonX, moonY, 55);

    // 5. 更新月牙位置
    moonX += moonSpeedX;
    moonY += moonSpeedY;

    // 6. 碰到边缘就弹回来
    
    let moonR = 30;

    if (moonX > quadSize - moonR || moonX < moonR) {
        moonSpeedX *= -1;
    }

    if (moonY > quadSize - moonR || moonY < moonR) {
        moonSpeedY *= -1;
    }
}

// 画月牙函数？？？整不明白但是没关系

function drawCrescentMoon(pg, x, y, size) {

    // 外层光晕
    pg.noStroke();
    pg.fill(235, 210, 180, 45);
    pg.circle(x, y, size + 18);

    // 主月亮
    pg.fill(225, 205, 170);
    pg.circle(x, y, size);

    // 遮挡月亮形成月牙
   
    pg.fill(105, 70, 135);
    pg.circle(x + size * 0.28, y - size * 0.06, size * 0.82);
}

// 第二个面：北京黑色山影 + 梦幻背景 + 大星星抖动

function drawFace2(pg) {

    // 1. 梦幻渐变背景（比第一面略偏冷）

    for (let y = 0; y < quadSize; y++) {

        let t = map(y, 0, quadSize, 0, 1);

        let topR = 38;
        let topG = 28;
        let topB = 85;

        let bottomR = 160;
        let bottomG = 120;
        let bottomB = 185;

        let r = lerp(topR, bottomR, t);
        let g = lerp(topG, bottomG, t);
        let b = lerp(topB, bottomB, t);

        pg.stroke(r, g, b);
        pg.line(0, y, quadSize, y);
    }

    // 2. 大一些的星星，轻轻抖动 + 闪烁
    pg.noStroke();

    for (let i = 0; i < beijingStars.length; i++) {
    let s = beijingStars[i];

        // 星星轻微抖动
        let sx = s.x + sin(frameCount * 0.05 + s.offset) * 2.5;
        let sy = s.y + cos(frameCount * 0.05 + s.offset) * 2.5;

        // 星星闪烁亮度
        let alpha = map(
            sin(frameCount * s.twinkleSpeed + s.offset),
            -1, 1,
            110, 255
        );

        // 外层光晕
        pg.fill(255, 235, 245, alpha * 0.25);
        pg.circle(sx, sy, s.size * 2.4);

        // 主体星星
        pg.fill(255, 245, 250, alpha);
        pg.circle(sx, sy, s.size);
    }

    // 3. 北京黑色山 / 城市剪影
    // 先画远处山影
    pg.noStroke();
    pg.fill(18, 15, 25);
    pg.beginShape();
    pg.vertex(0, 300);
    pg.vertex(40, 280);
    pg.vertex(75, 290);
    pg.vertex(115, 255);
    pg.vertex(155, 275);
    pg.vertex(205, 245);
    pg.vertex(245, 268);
    pg.vertex(295, 238);
    pg.vertex(345, 275);
    pg.vertex(400, 250);
    pg.vertex(400, 400);
    pg.vertex(0, 400);
    pg.endShape(CLOSE);

    // 再画更近的黑色山影 / 地平线
    pg.fill(8, 8, 12);
    pg.beginShape();
    pg.vertex(0, 340);
    pg.vertex(35, 330);
    pg.vertex(80, 345);
    pg.vertex(130, 315);
    pg.vertex(180, 338);
    pg.vertex(230, 305);
    pg.vertex(275, 330);
    pg.vertex(320, 310);
    pg.vertex(360, 335);
    pg.vertex(400, 320);
    pg.vertex(400, 400);
    pg.vertex(0, 400);
    pg.endShape(CLOSE);

    // 加一点北京影子的感觉：简单的建筑轮廓
    pg.fill(0);
    pg.rect(250, 255, 18, 65);
    pg.rect(272, 240, 14, 80);
    pg.rect(290, 265, 22, 55);

    // 一个简化的塔形剪影
    pg.beginShape();
    pg.vertex(110, 320);
    pg.vertex(118, 275);
    pg.vertex(123, 270);
    pg.vertex(128, 275);
    pg.vertex(136, 320);
    pg.endShape(CLOSE);

    // 顶部小圆，像塔尖
    pg.circle(123, 266, 6);
}

// 第三个面：先保留之前的柔和轨道圆环

function drawFace3(pg) {


    // 1. 梦幻渐变背景
  
    for (let y = 0; y < quadSize; y++) {

        let t = map(y, 0, quadSize, 0, 1);

        // 上方颜色：深紫蓝
        let topR = 42;
        let topG = 32;
        let topB = 88;

        // 下方颜色：偏粉紫
        let bottomR = 170;
        let bottomG = 135;
        let bottomB = 190;

        let r = lerp(topR, bottomR, t);
        let g = lerp(topG, bottomG, t);
        let b = lerp(topB, bottomB, t);

        pg.stroke(r, g, b);
        pg.line(0, y, quadSize, y);
    }

    // 2. 月亮一闪一闪，时而出现时而不出现
  
    // 用 sin 控制透明度，形成忽隐忽现效果
    let moonAlpha = map(
        sin(frameCount * 0.03),
        -1, 1,
        0, 190
    );

    let moonX = 300;
    let moonY = 90;
    let moonSize = 52;

    // 外层光晕
    pg.noStroke();
    pg.fill(235, 210, 185, moonAlpha * 0.25);
    pg.circle(moonX, moonY, moonSize + 18);

    // 主月亮
    pg.fill(225, 205, 175, moonAlpha);
    pg.circle(moonX, moonY, moonSize);

    // 用背景近似色遮挡出月牙
    pg.fill(95, 70, 130, moonAlpha);
    pg.circle(moonX + moonSize * 0.28, moonY - moonSize * 0.06, moonSize * 0.82);

    
    // 3. 远处海平面
   
    pg.noStroke();
    pg.fill(90, 105, 165, 120);
    pg.rect(0, 215, quadSize, 8);

    // 4. 大海
    // 用分层的波浪线和色块表现海面
    pg.fill(90, 110, 180, 130);
    pg.rect(0, 220, quadSize, 95);

    pg.fill(75, 95, 165, 120);
    pg.rect(0, 250, quadSize, 70);

    pg.noFill();
    pg.strokeWeight(2);

    // 第一层海浪
    pg.stroke(220, 220, 255, 70);
    pg.beginShape();
    for (let x = 0; x <= quadSize; x += 10) {
        let y = 235 + sin(x * 0.03 + frameCount * 0.03) * 5;
        pg.vertex(x, y);
    }
    pg.endShape();

    // 第二层海浪
    pg.stroke(200, 210, 255, 60);
    pg.beginShape();
    for (let x = 0; x <= quadSize; x += 10) {
        let y = 265 + sin(x * 0.025 + frameCount * 0.025 + 2) * 6;
        pg.vertex(x, y);
    }
    pg.endShape();

    // 第三层海浪
    pg.stroke(235, 235, 255, 50);
    pg.beginShape();
    for (let x = 0; x <= quadSize; x += 10) {
        let y = 290 + sin(x * 0.035 + frameCount * 0.02 + 1) * 4;
        pg.vertex(x, y);
    }
    pg.endShape();

   
    // 5. 沙滩
  
    pg.noStroke();

    // 主沙滩
    pg.fill(215, 185, 160);
    pg.rect(0, 315, quadSize, 85);

    // 更柔和的沙滩过渡
    pg.fill(235, 205, 180, 70);
    pg.rect(0, 305, quadSize, 18);

    // 6. 沙滩上的一些柔和圆点/贝壳感装饰
 
    pg.fill(245, 220, 200, 90);
    pg.circle(65, 350, 12);
    pg.circle(130, 370, 10);
    pg.circle(255, 345, 14);
    pg.circle(310, 375, 11);

    pg.fill(230, 200, 185, 80);
    pg.circle(95, 385, 8);
    pg.circle(210, 360, 9);
    pg.circle(350, 340, 7);

    // ------------------------------
    // 7. 给海面加一点梦幻高光
    // ------------------------------
    pg.noStroke();
    pg.fill(255, 235, 245, 30);
    pg.ellipse(120, 260, 90, 20);
    pg.ellipse(250, 245, 110, 24);
    pg.ellipse(320, 285, 80, 18);
}

// 保留老师要求的快捷键

function keyPressed() {
    switch (key) {

        // c：进入 / 退出校准模式
        case "c":
            pMapper.toggleCalibration();
            break;

        // f：切换全屏
        case "f":
            let fs = fullscreen();
            fullscreen(!fs);
            break;

        // s：保存校准数据
        case "s":
            pMapper.save("map.json");
            break;

        // l：加载 maps 文件夹中的 map.json
        case "l":
            pMapper.load("maps/map.json");
            break;
    }
}

// 浏览器窗口变化时，自动调整画布大小
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
