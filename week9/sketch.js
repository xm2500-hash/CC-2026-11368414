let video;
let handPose;
let hands = [];

let cupX = 320;
let cupY = 260;
let teaLevel = 0.5;

async function setup() {
  createCanvas(640, 480);

  // Open the camera and hide its HTML element.
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Load HandPose and start tracking.
  try {
    handPose = await ml5.handPose();
    handPose.detectStart(video, gotHands);
  } catch (error) {
    console.error("HandPose failed to load:", error);
  }
}

function gotHands(results) {
  hands = results;
}

function draw() {
  background(255);

  // Show the camera as a mirrored background.
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  if (hands.length > 0) {
    let hand = hands[0];

    // Thumb tip and index finger tip.
    let thumb = hand.keypoints[4];
    let index = hand.keypoints[8];

    // Follow the midpoint between the fingertips.
    let targetX = width - (thumb.x + index.x) / 2;
    let targetY = (thumb.y + index.y) / 2;

    // Keep the cup inside the canvas.
    targetX = constrain(targetX, 110, width - 110);
    targetY = constrain(targetY, 190, height - 150);

    // Smooth the cup's movement.
    cupX = lerp(cupX, targetX, 0.15);
    cupY = lerp(cupY, targetY, 0.15);

    // Distance between the two fingertips.
    let fingerDistance = dist(
      thumb.x,
      thumb.y,
      index.x,
      index.y
    );

    // Palm size helps account for distance from the camera.
    let wrist = hand.keypoints[0];
    let middleBase = hand.keypoints[9];

    let palmSize = dist(
      wrist.x,
      wrist.y,
      middleBase.x,
      middleBase.y
    );

    let ratio = fingerDistance / max(palmSize, 1);

    // Spread fingers to fill; pinch to empty.
    let targetLevel = map(
      ratio,
      0.15,
      1.5,
      0,
      1,
      true
    );

    teaLevel = lerp(teaLevel, targetLevel, 0.12);
  }

  drawMilkTea(cupX, cupY);
}

function drawMilkTea(x, y) {
  push();
  translate(x, y);

  // Shadow.
  noStroke();
  fill(166, 119, 143, 25);
  ellipse(0, 133, 170, 22);

  // Transparent cup.
  fill(255, 255, 255, 160);
  quad(
    -85, -95,
    85, -95,
    65, 120,
    -65, 120
  );

  // Milk tea.
  let bottomY = 116;
  let liquidY = lerp(bottomY, -85, teaLevel);

  let liquidHalfWidth =
    map(liquidY, -95, 120, 85, 65) - 4;

  if (teaLevel > 0.005) {
    noStroke();
    fill(199, 151, 105);

    quad(
      -liquidHalfWidth, liquidY,
      liquidHalfWidth, liquidY,
      61, bottomY,
      -61, bottomY
    );

    // Liquid surface.
    fill(225, 184, 139);
    ellipse(
      0,
      liquidY,
      liquidHalfWidth * 2,
      8
    );
  }

  // Solid-color straw.
  stroke(177, 128, 186);
  strokeWeight(15);
  strokeCap(SQUARE);
  line(30, 98, 45, -160);

  // Solid-color tapioca pearls.
  noStroke();

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
      let pearlX =
        -44 + col * 22 + (row % 2) * 5;

      let pearlY = 104 - row * 19;

      fill(58, 39, 46);
      circle(pearlX, pearlY, 17);
    }
  }

  // Cup outline.
  noFill();
  stroke(137, 105, 119);
  strokeWeight(3);
  strokeJoin(ROUND);

  beginShape();
  vertex(-85, -95);
  vertex(-65, 120);
  vertex(65, 120);
  vertex(85, -95);
  endShape();

  // Cup rim.
  fill(255, 248, 252, 190);
  rect(-92, -104, 184, 13, 6);

  // Glass highlight.
  stroke(255, 255, 255, 190);
  strokeWeight(5);
  line(-68, -65, -57, 62);

  // Xiaoyan name tag.
  noStroke();
  fill(255, 245, 235);
  rect(-51, -12, 102, 42, 5);

  fill(100, 72, 60);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Xiaoyan", 0, 9);

  pop();
}