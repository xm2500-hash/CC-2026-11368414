
let img;
let rad = 12;
let dim = rad * 2;
let xoff, yoff;

// Red highlight variables
let redX = -100;
let redY = -100;
let showRed = true;

async function setup() {
  createCanvas(800, 600);
  pixelDensity(1);

  // Load my portrait
  img = await loadImage("assets/portrait.jpg");

  // Resize the image
  if (img.width > width) {
    img.resize(width, 0);
  }
  if (img.height > height) {
    img.resize(0, height);
  }

  img.loadPixels();

  // Center the image
  xoff = (width - img.width) / 2;
  yoff = (height - img.height) / 2;
}

function draw() {
  background(0);
  noStroke();

  // Change circle size with mouse
  rad = floor(map(mouseX, 0, width, 2, 32));
  rad = constrain(rad, 2, 32);
  dim = rad * 2;

  translate(xoff, yoff);

  // Draw pixel circles
  for (let y = rad; y < img.height - rad; y += dim) {
    for (let x = rad; x < img.width - rad; x += dim) {

      let pixelNum = 4 * (y * img.width + x);

      let r = img.pixels[pixelNum];
      let g = img.pixels[pixelNum + 1];
      let b = img.pixels[pixelNum + 2];

      // Convert RGB to grayscale
      let gray = (r + g + b) / 3;

      // Check distance from selected point
      let distance = dist(x, y, redX, redY);

      if (showRed && distance < 35) {
        fill(255, 0, 0);
      } else {
        fill(gray);
      }

      ellipse(x, y, 1.75 * rad, 1.75 * rad);
    }
  }
}

// Click to select the red area
function mousePressed() {
  redX = mouseX - xoff;
  redY = mouseY - yoff;
}

// Press R to toggle red
function keyPressed() {
  if (key === 'r' || key === 'R') {
    showRed = !showRed;
  }
}
