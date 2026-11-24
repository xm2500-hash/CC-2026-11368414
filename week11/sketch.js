
// Dear ms.Variables 
let data;
let stars = [];
let clouds = [];
let farBuildings = [];
let nearBuildings = [];
let raindrops = [];
let snowflakes = [];
// Tianjin Weather
let url = "https://api.open-meteo.com/v1/forecast?latitude=39.0842&longitude=117.201&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,rain,is_day,wind_speed_10m,wind_direction_10m,precipitation,snowfall,showers,weather_code,cloud_cover&timezone=Asia%2FSingapore";

async function setup() {
  createCanvas(1000, 650);
//88stars
  for (let i = 0; i < 88; i++) {
    stars.push({
      x: random(width),
      y: random(0, 350),
      size: random(1, 3),
      phase: random(TWO_PI)
    });
  }
// 20 clouds
  for (let i = 0; i < 20; i++) {
    clouds.push({
      x: random(-150, width + 150),
      y: random(150, 380),
      size: random(120, 220)
    });
  }
  //leave space for wheel
for (let x = 0; x < width; x += 85) {
  if (x < 330 || x > 650) {
    farBuildings.push({
      x: x,
      w: random(65, 95),
      h: random(130, 260)
    });
  }
}

for (let x = 0; x < width; x += 75) {
  if (x < 300 || x > 650) {
    nearBuildings.push({
      x: x,
      w: random(50, 70),
      h: random(80, 190)
    });
  }
}
//下雨的变量
for (let i = 0; i < 400; i++) {
  raindrops.push({
    x: random(width),
    y: random(height),
    length: random(10, 25),
    speed: random(8, 15)
  });
}
//下雪
for (let i = 0; i < 250; i++) {
  snowflakes.push({
    x: random(width),
    y: random(height),
    size: random(2, 6),
    speed: random(0.5, 2),
    phase: random(TWO_PI)
  });
}
  await loadData(url);

setInterval(() => loadData(url), 300000);
}
//Drawing Function
function draw() {
  background(220);

  if (!data || !data.current) {
    return;
  }

  drawSky();
  drawStars();
  drawSunMoon();
  drawClouds();

  drawBuildings();

  drawRiver();
  drawWaterReflection();

  drawFerrisWheel();
  drawBridge();

  drawFog();
  drawRain();
  drawSnow();
}

function drawSky() {
  let temperature = data.current.temperature_2m;
  let isDay = data.current.is_day;

  let amount = map(temperature, -15, 40, 0, 1);
  amount = constrain(amount, 0, 1);

  let topColor;
  let bottomColor;

//color change based on day or night
  if (isDay == 1) {

    topColor = lerpColor(
      color(130, 160, 210),
      color(245, 180, 190),
      amount
    );

    bottomColor = color(255, 225, 235);

  } else {

    topColor = color(25, 15, 50);

    bottomColor = lerpColor(
      color(65, 70, 130),
      color(180, 100, 150),
      amount
    );
  }
//
  for (let y = 0; y < height; y++) {

    let position = map(y, 0, height, 0, 1);
// transparent base on 天黑天亮
    let skyColor = lerpColor(
      topColor,
      bottomColor,
      position
    );

    stroke(skyColor);
    line(0, y, width, y);
  }
}

function drawStars() {

  if (data.current.is_day == 1) {
    return;
  }

  let cloudCover = data.current.cloud_cover;

  let visibility = map(
    cloudCover, 0, 100, 255, 0
  );

  noStroke();

  for (let i = 0; i < stars.length; i++) {

    let s = stars[i];

    let twinkle = map(
      sin(frameCount * 0.03 + s.phase),
      -1, 1, 0.4, 1
    );

    fill(255, 240, 230, visibility * twinkle);

    circle(s.x, s.y, s.size);
  }
}
// API lead to sun and moon
function drawSunMoon() {

  let x = 780;
  let y = 150;

  noStroke();

  if (data.current.is_day == 1) {

    for (let i = 180; i > 90; i -= 10) {
      fill(255, 220, 170, 8);
      circle(x, y, i);
    }

    fill(255, 225, 180);
    circle(x, y, 90);

  } else {

    for (let i = 150; i > 80; i -= 10) {
      fill(255, 230, 210, 5);
      circle(x, y, i);
    }

    fill(255, 235, 215);

    arc(
      x, y, 85, 85,
      HALF_PI, PI + HALF_PI,
      CHORD
    );

    arc(
      x, y, 35, 85,
      -HALF_PI, HALF_PI,
      CHORD
    );
  }
}
// how to control the cloud?
function drawClouds() {

  let cloudCover = data.current.cloud_cover;
  let windSpeed = data.current.wind_speed_10m;
  let windDirection = data.current.wind_direction_10m;

  let cloudCount = ceil(
    map(cloudCover, 0, 100, 0, clouds.length)
  );

  cloudCount = constrain(
    cloudCount, 0, clouds.length
  );

  let speed = map(windSpeed, 0, 60, 0, 1.5);

  let direction = -sin(radians(windDirection));

  for (let i = 0; i < cloudCount; i++) {

    let c = clouds[i];

    c.x += speed * direction;

    if (c.x > width + 250) {
      c.x = -250;
    }

    if (c.x < -250) {
      c.x = width + 250;
    }

    drawSingleCloud(c.x, c.y, c.size);
  }
}
// draw the fucking cloud
function drawSingleCloud(x, y, s) {
  drawingContext.save();

  let gradient = drawingContext.createLinearGradient(
    x, y - s * 0.7,
    x, y + s * 0.5
  );

  gradient.addColorStop(0, "rgba(255, 245, 250, 0.10)");
  gradient.addColorStop(0.5, "rgba(255, 240, 245, 0.22)");
  gradient.addColorStop(1, "rgba(255, 235, 245, 0.42)");

  drawingContext.fillStyle = gradient;


  drawingContext.beginPath();

  drawingContext.moveTo(x - s * 1.05, y + s * 0.15);

  drawingContext.bezierCurveTo(
    x - s * 1.18, y - s * 0.10,
    x - s * 1.02, y - s * 0.38,
    x - s * 0.72, y - s * 0.30
  );

  drawingContext.bezierCurveTo(
    x - s * 0.62, y - s * 0.62,
    x - s * 0.20, y - s * 0.72,
    x, y - s * 0.42
  );

  drawingContext.bezierCurveTo(
    x + s * 0.18, y - s * 0.72,
    x + s * 0.60, y - s * 0.62,
    x + s * 0.70, y - s * 0.30
  );

  drawingContext.bezierCurveTo(
    x + s * 1.00, y - s * 0.42,
    x + s * 1.18, y - s * 0.10,
    x + s * 1.00, y + s * 0.18
  );

  drawingContext.bezierCurveTo(
    x + s * 1.02, y + s * 0.48,
    x + s * 0.72, y + s * 0.54,
    x + s * 0.42, y + s * 0.36
  );

  drawingContext.bezierCurveTo(
    x + s * 0.24, y + s * 0.60,
    x - s * 0.06, y + s * 0.62,
    x - s * 0.24, y + s * 0.40
  );

  drawingContext.bezierCurveTo(
    x - s * 0.46, y + s * 0.62,
    x - s * 0.82, y + s * 0.54,
    x - s * 1.05, y + s * 0.15
  );

  drawingContext.closePath();
  drawingContext.fill();

  drawingContext.restore();
}
// draw the ferris wheel
function drawFerrisWheel() {

  let x = 500;
  let y = 350;
  let r = 140;

  let rotation = frameCount * 0.0015;

  let wheelColor;

  if (data.current.is_day == 1) {
    wheelColor = color(150, 120, 170);
  } else {
    wheelColor = color(245, 190, 219);
  }

  push();

  stroke(wheelColor);
  strokeWeight(7);

  line(x - 70, 540, x, y);
  line(x + 70, 540, x, y);

  noFill();

  strokeWeight(3);
  circle(x, y, r * 2);

  strokeWeight(1.5);
  circle(x, y, (r - 10) * 2);

  for (let i = 0; i < 24; i++) {

    let angle = TWO_PI / 24 * i + rotation;

    let px = x + cos(angle) * r;
    let py = y + sin(angle) * r;

    stroke(wheelColor);
    strokeWeight(1);

    line(x, y, px, py);

    noStroke();
    fill(wheelColor);

    rectMode(CENTER);
    rect(px, py, 20, 16, 6);

    fill(161, 127, 172);
    rect(px, py - 2, 12, 7, 2);
  }

  noStroke();
  fill(wheelColor);
  circle(x, y, 18);

  pop();
}
// rivver river
function drawRiver() {

  let topColor;
  let bottomColor;

  if (data.current.is_day == 1) {
    topColor = color(180, 175, 210);
    bottomColor = color(125, 140, 185);
  } else {
    topColor = color(89, 68, 110);
    bottomColor = color(35, 23, 48);
  }

  for (let y = 555; y < height; y++) {

    let amount = map(y, 555, height, 0, 1);

    let riverColor = lerpColor(
      topColor, bottomColor, amount
    );

    stroke(riverColor);
    strokeWeight(1);
    line(0, y, width, y);
  }
}
// draw the reflection of the water 
function drawWaterReflection() {

  push();

  let windSpeed = data.current.wind_speed_10m;
  let speed = map(windSpeed, 0, 60, 0.01, 0.05);

  strokeWeight(1);

  for (let i = 0; i < 35; i++) {

    let x = (i * 173.3) % width;
    let y = 565 + (i * 29) % 85;

    let movement = sin(
      frameCount * speed + i
    ) * 12;

    stroke(200, 175, 220, 35);

    line(
      x + movement, y,
      x + movement + 40, y
    );
  }

  if (data.current.is_day == 0) {

    strokeWeight(2);

    for (let i = 0; i < 25; i++) {

      let y = 565 + i * 3.3;

      let x = 500 + sin(
        frameCount * 0.02 + i * 2
      ) * (25 + i * 2);

      let reflectionWidth = 15 + (i % 5) * 9;

      let alpha = map(i, 0, 25, 120, 10);

      stroke(255, 190, 225, alpha);

      line(
        x - reflectionWidth, y,
        x + reflectionWidth, y
      );
    }
  }

  pop();
}
// draw the buildings
function drawBuildings() {

  push();

  rectMode(CORNER);
  noStroke();

  let isDay = data.current.is_day;

  for (let i = 0; i < farBuildings.length; i++) {

    let b = farBuildings[i];

    if (isDay == 1) {
      fill(190, 175, 210);
    } else {
      fill(104, 83, 127);
    }

    rect(b.x, 535 - b.h, b.w, b.h);
  }

  for (let i = 0; i < nearBuildings.length; i++) {

    let b = nearBuildings[i];

    if (isDay == 1) {
      fill(150, 130, 175);
    } else {
      fill(57, 39, 71);
    }

    rect(b.x, 535 - b.h, b.w, b.h);

    for (let wx = 12; wx < b.w - 8; wx += 17) {

      for (let wy = 15; wy < b.h - 10; wy += 21) {

        if (isDay == 1) {// 判断是不是白天

          fill(110, 95, 140, 100);

        } else {

          let light = noise(i, wx, wy);

          if (light > 0.5) {
            fill(255, 210, 190, 170);
          } else {
            fill(30, 20, 45, 100);
          }
        }

        rect(
          b.x + wx,
          535 - b.h + wy,//Y Position
          6, 10, 1
        );
      }
    }
  }

  pop();
}
// get the  weather information 
function drawRain() {

  let rain = data.current.rain + data.current.showers;
  let wind = data.current.wind_speed_10m;
  let direction = -sin(radians(data.current.wind_direction_10m));

  let count = constrain(
    ceil(map(rain, 0, 5, 0, 400)),
    0, raindrops.length
  );

  let drift = map(wind, 0, 60, 0, 5) * direction;

  push();

  stroke(210, 220, 255, 100);
  strokeWeight(1.2);

  for (let i = 0; i < count; i++) {

    let r = raindrops[i];

    line(
      r.x, r.y,
      r.x + drift * 2,
      r.y + r.length
    );

    r.y += r.speed;
    r.x += drift;

    if (r.y > height) {
      r.y = -30;
      r.x = random(width);
    }

    if (r.x > width) r.x = 0;
    if (r.x < 0) r.x = width;
  }

  pop();
}
function drawFog() {

  let humidity = data.current.relative_humidity_2m;

  let opacity = constrain(
    map(humidity, 70, 100, 0, 65),
    0, 65
  );

  push();

  strokeWeight(1);

  for (let y = 250; y < height; y++) {

    let alpha = map(y, 250, height, 0, opacity);

    stroke(220, 210, 235, alpha);
    line(0, y, width, y);
  }

  pop();
}
function drawBridge() {

  push();

  let bridgeColor;
  let railingColor;

  if (data.current.is_day == 1) {
    bridgeColor = color(150, 130, 175);
    railingColor = color(200, 180, 215);
  } else {
    bridgeColor = color(73, 51, 83);
    railingColor = color(178, 143, 191);
  }

  rectMode(CORNER);
  noStroke();

  fill(bridgeColor);

  rect(200, 540, 25, 68);
  rect(775, 540, 25, 68);

  rect(0, 535, width, 25);

  fill(railingColor);
  rect(0, 535, width, 3);

  stroke(railingColor);
  strokeWeight(2);

  line(0, 522, width, 522);

  for (let x = 0; x < width; x += 25) {
    line(x, 522, x, 535);
  }

  if (data.current.is_day == 0) {

    noStroke();

    for (let x = 25; x < width; x += 50) {

      fill(255, 220, 210, 25);
      circle(x, 534, 15);

      fill(255, 220, 210);
      circle(x, 534, 5);
    }
  }

  pop();
}

function drawSnow() {

  let snowfall = data.current.snowfall;
  let wind = data.current.wind_speed_10m;
  let direction = -sin(radians(data.current.wind_direction_10m));

  let count = constrain(
    ceil(map(snowfall, 0, 2, 0, 250)),
    0, snowflakes.length
  );

  let drift = map(wind, 0, 60, 0, 2) * direction;

  push();

  noStroke();
  fill(255, 245, 250, 200);

  for (let i = 0; i < count; i++) {

    let s = snowflakes[i];

    circle(s.x, s.y, s.size);

    s.y += s.speed;

    s.x += sin(frameCount * 0.02 + s.phase) * 0.5 + drift;

    if (s.y > height) {
      s.y = -10;
      s.x = random(width);
    }

    if (s.x > width) s.x = 0;
    if (s.x < 0) s.x = width;
  }

  pop();
}

function drawWeatherInfo() {

  let weather = data.current;

  push();

  noStroke();

  if (weather.is_day == 1) {
    fill(65, 45, 90);
  } else {
    fill(255, 224, 237);
  }

  textFont("Georgia");
  textAlign(LEFT, TOP);

  textSize(34);
  text("天津", 35, 30);

  textSize(16);
  text("Tianjin, China", 35, 68);

  textFont("Times New Roman");
textSize(65);
text(weather.temperature_2m + "°C", 30, 100);

textFont("Georgia");

  textSize(17);

  if (weather.is_day == 1) {
    text("Daytime", 35, 180);
  } else {
    text("Nighttime", 35, 180);
  }
textSize(17);
text("Home is 11,089 km away.", 35, 210);
  textAlign(RIGHT, TOP);

  textSize(12);
  text("LOCAL TIME", 965, 30);

  textSize(26);
  text(weather.time.slice(-5), 965, 50);

  textSize(14);
  text(weather.time.slice(0, 10), 965, 85);

  textAlign(LEFT, TOP);
  fill(255, 224, 237);

  textSize(14);

  text("Humidity", 35, 580);
  text("Wind Speed", 280, 580);
  text("Cloud Cover", 525, 580);
  text("Precipitation", 770, 580);

  textSize(24);

  text(weather.relative_humidity_2m + "%", 35, 600);
  text(weather.wind_speed_10m + " km/h", 280, 600);
  text(weather.cloud_cover + "%", 525, 600);
  text(weather.precipitation + " mm", 770, 600);

  textSize(10);
  text("Weather data by Open-Meteo", 35, 635);

  pop();
}

function draw() {
  background(220);

  if (!data || !data.current) {
    return;
  }

  drawSky();
  drawStars();
  drawSunMoon();
  drawClouds();

  drawBuildings();

  drawRiver();
  drawWaterReflection();

  drawFerrisWheel();
  drawBridge();

  drawFog();
  drawRain();
  drawSnow();

  drawWeatherInfo();
}

async function loadData(location) {
  try {
    data = await loadJSON(location);
    console.log("Weather updated:", data.current.time);
  } catch (error) {
    console.log("Unable to update weather:", error);
  }
}