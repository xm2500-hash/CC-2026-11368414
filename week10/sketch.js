
let song;
let amplitude;
let fft;

let playButton;
let colorSlider;
let motionSlider;

let musicLoaded = false;
let errorMessage = "";

let smoothLevel = 0;
let smoothHigh = 0;

let stars = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);

  // --------------------------------
  // MUSIC BUTTON
  // --------------------------------

  
  // --------------------------------
  // MUSIC BUTTON
  // --------------------------------

  playButton = createButton("Loading Music...");
  playButton.position(30, 30);
  playButton.size(140, 38);
  playButton.addClass("music-button");
  playButton.attribute("disabled", "");
  playButton.mousePressed(toggleMusic);

  // --------------------------------
  // CONTROL PANEL
  // --------------------------------

  let controlPanel = createDiv();
  controlPanel.addClass("control-panel");

  // Color control
  let colorGroup = createDiv();
  colorGroup.addClass("control-group");
  colorGroup.parent(controlPanel);

  let colorLabel = createDiv("COLOR");
  colorLabel.addClass("control-label");
  colorLabel.parent(colorGroup);

  colorSlider = createSlider(0, 100, 30);
  colorSlider.addClass("music-slider");
  colorSlider.parent(colorGroup);

  // Motion control
  let motionGroup = createDiv();
  motionGroup.addClass("control-group");
  motionGroup.parent(controlPanel);

  let motionLabel = createDiv("MOTION");
  motionLabel.addClass("control-label");
  motionLabel.parent(motionGroup);

  motionSlider = createSlider(0, 100, 50);
  motionSlider.addClass("music-slider");
  motionSlider.parent(motionGroup);




  // --------------------------------
  // CREATE STARS
  // --------------------------------

  for (let i = 0; i < 65; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3.5),
      phase: random(TWO_PI),
      speed: random(0.2, 0.7)
    });
  }

  // --------------------------------
  // LOAD MUSIC
  // --------------------------------

  try {
    song = await loadSound("assets/nocturne.mp3");

    // Volume analyzer
    amplitude = new p5.Amplitude();
    song.connect(amplitude);

    // Frequency analyzer
    // Compatible with teacher's example
    fft = new p5.FFT(512);
    song.connect(fft);

    musicLoaded = true;

    playButton.removeAttribute("disabled");
    playButton.html("Play Music");

  } catch (error) {
    errorMessage = String(error);
    console.error("Music loading error:", error);
    playButton.html("Music Error");
  }
}

function draw() {
  background(12, 13, 30);

  // --------------------------------
  // SLIDER VALUES
  // --------------------------------

  let colorValue = colorSlider.value();
  let motionValue = motionSlider.value();

  // 0 = lavender, 100 = pink
  let ribbonColor = lerpColor(
    color(185, 155, 255),
    color(255, 155, 205),
    colorValue / 100
  );

  let secondColor = lerpColor(
    color(255, 175, 215),
    color(255, 205, 225),
    colorValue / 100
  );

  let motionScale = map(
    motionValue, 0, 100, 0.2, 2
  );

  // --------------------------------
  // MUSIC VOLUME ANALYSIS
  // --------------------------------

  let level = 0;

  if (musicLoaded && song && amplitude) {
    level = amplitude.getLevel();
  }

  smoothLevel = lerp(
    smoothLevel, level, 0.08
  );

  // --------------------------------
  // HIGH FREQUENCY ANALYSIS
  // --------------------------------

  let highEnergy = 0;

  if (musicLoaded && song && fft && song.isPlaying()) {

    let spectrum = fft.analyze();

    let nyquist =
      getAudioContext().sampleRate / 2;

    let lowIndex = floor(
      2000 / nyquist * spectrum.length
    );

    let highIndex = min(
      spectrum.length - 1,
      ceil(12000 / nyquist * spectrum.length)
    );

    let sum = 0;

    for (let i = lowIndex; i <= highIndex; i++) {
      sum += spectrum[i];
    }

    let average =
      sum / (highIndex - lowIndex + 1);

    highEnergy = constrain(
      map(
        20 * Math.log10(average + 1e-6),
        -100, -10, 0, 1
      ),
      0, 1
    );
  }

  smoothHigh = lerp(
    smoothHigh, highEnergy, 0.08
  );

  // --------------------------------
  // BREATHING CIRCLE
  // --------------------------------

  let idleBreathing =
    sin(frameCount * 0.025) * 8;

  let circleSize =
    130 +
    idleBreathing +
    smoothLevel * 1400;

  noStroke();

  // Outer glow
  fill(
    red(ribbonColor),
    green(ribbonColor),
    blue(ribbonColor),
    30
  );

  circle(
    width / 2,
    height / 2,
    circleSize * 1.7
  );

  // Middle glow
  fill(
    red(ribbonColor),
    green(ribbonColor),
    blue(ribbonColor),
    70
  );

  circle(
    width / 2,
    height / 2,
    circleSize * 1.3
  );

  // Inner circle
  fill(
    red(ribbonColor),
    green(ribbonColor),
    blue(ribbonColor),
    175
  );

  circle(
    width / 2,
    height / 2,
    circleSize
  );

  // --------------------------------
  // FLOWING RIBBONS
  // --------------------------------

  
  // --------------------------------
  // GLOWING FLOWING RIBBONS
  // --------------------------------

  let waveHeight =
    (30 + smoothLevel * 900) * motionScale;

  // First glowing ribbon
  drawGlowingRibbon(
    ribbonColor,
    0.009,
    0.035,
    waveHeight,
    0
  );

  // Second glowing ribbon
  drawGlowingRibbon(
    secondColor,
    0.007,
    -0.028,
    waveHeight * 0.75,
    1.5
  );


  // --------------------------------
  // PIANO-INSPIRED STARS
  // --------------------------------

  noStroke();

  for (let star of stars) {

    // Floating movement
    star.y -= star.speed * 0.25;

    if (star.y < 0) {
      star.y = height;
      star.x = random(width);
    }

    // Twinkling
    let twinkle =
      (sin(frameCount * 0.035 + star.phase) + 1) / 2;

    // High frequencies affect brightness
    let brightness =
      35 +
      twinkle * 65 +
      smoothHigh * 155;

    brightness = constrain(
      brightness, 0, 255
    );

    // High frequencies affect size
    let starSize =
      star.size + smoothHigh * 4;

    fill(
      235, 225, 255,
      brightness
    );

    circle(
      star.x,
      star.y,
      starSize
    );
  }

  // --------------------------------
  // TITLE
  // --------------------------------

  noStroke();
  textAlign(CENTER);

  fill(235, 220, 255);
  textSize(26);
  text(
    "NOCTURNE",
    width / 2,
    100
  );

  fill(180, 165, 210);
  textSize(12);
  text(
    "Nana Ouyang",
    width / 2,
    128
  );

  // --------------------------------
  // SLIDER LABELS
  // --------------------------------

  textAlign(LEFT);
  textSize(14);
  fill(220, 200, 245);

  text(
    "Color",
    30,
    height - 125
  );

  text(
    "Motion",
    30,
    height - 70
  );

  // --------------------------------
  // ERROR MESSAGE
  // --------------------------------

  if (errorMessage) {
    fill(255, 120, 140);
    textSize(13);
    text(
      "Music loading failed. Check Console.",
      30,
      90
    );
  }
}

// --------------------------------
// MUSIC CONTROL
// --------------------------------

async function toggleMusic() {

  if (!musicLoaded || !song) return;

  await userStartAudio();

  if (song.isPlaying()) {
    song.pause();
    playButton.html("Play Music");
  } else {
    song.play();
    playButton.html("Pause Music");
  }
}

// --------------------------------
// WINDOW RESIZE
// --------------------------------

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

  // Keep sliders at bottom left
  colorSlider.position(
    30,
    height - 110
  );

  motionSlider.position(
    30,
    height - 55
  );
}

f
function drawGlowingRibbon(
  ribbonColor,
  frequency,
  speed,
  amplitudeValue,
  phase
) {

  // --------------------------------
  // PREPARE COLOR
  // --------------------------------

  let r = red(ribbonColor);
  let g = green(ribbonColor);
  let b = blue(ribbonColor);

  // Use larger steps to improve performance
  let step = 12;

  // --------------------------------
  // DRAW FLOWING SEGMENTS
  // --------------------------------

  for (let x = 0; x < width; x += step) {

    let x2 = min(x + step, width);

    // Wave position
    let y1 =
      height / 2 +
      sin(
        x * frequency +
        frameCount * speed +
        phase
      ) * amplitudeValue;

    let y2 =
      height / 2 +
      sin(
        x2 * frequency +
        frameCount * speed +
        phase
      ) * amplitudeValue;

    // Variable thickness
    let thickness =
      1.5 +
      (sin(
        x * 0.012 +
        frameCount * 0.018 +
        phase
      ) + 1) * 1.8 +
      smoothLevel * 8;

    // --------------------------------
    // OUTER GLOW
    // --------------------------------

    stroke(r, g, b, 24);
    strokeWeight(thickness * 3.5);
    line(x, y1, x2, y2);

    // --------------------------------
    // INNER GLOW
    // --------------------------------

    stroke(r, g, b, 75);
    strokeWeight(thickness * 1.8);
    line(x, y1, x2, y2);

    // --------------------------------
    // BRIGHT CORE
    // --------------------------------

    stroke(
      min(r + 25, 255),
      min(g + 25, 255),
      min(b + 15, 255),
      225
    );

    strokeWeight(max(0.8, thickness * 0.45));
    line(x, y1, x2, y2);
  }
}
