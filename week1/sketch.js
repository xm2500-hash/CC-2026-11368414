// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!

const quotes = [
  { text: "Creative coding is the practice of combining programming techniques with artistic expression in order to create aesthetically pleasing and optimized interactive digital experiences.", 
   source: "Meadows School of the Arts" },
  { text: "(Creative Coding) is a process, based on exploration, iteration, reflection and discovery, where code is used as the primary medium to create a wide range of media artifacts.", 
   source: ".timrodenbroeker" },
  { text: "Creative coding is a new interdisciplinary art form that bridges the gap between technologists and artists. ", 
   source: "Gorilla Sun" },
  { text: "Creative Coding is a loosely defined term used to describe a wide range of artistic practices that use computer code as a medium. ", 
   source: "Creative Code Berlin" },
  { text: "Creative coding is a practice where programming is used as a tool for art or design. ", 
   source: "DigitalFUTURES" },
  { text: "creative coding is the practice of using computer programming as a medium for artistic and personal expression.", 
   source: "Diatom" },
  { text: "a Creative Coding is a broad term that describes the process of using code, low-level technology, and computers as artistic and design tools. ", 
   source: "Montana Media Art" },
  { text: "Creative coding is an excellent introduction to programming and graphics, and complementary to learning real-time 3D engines.", 
   source: "The Guidebook" }
];
// no need to edit anything below this line! 
// if you have made an error, you can check your history to see what might have gone wrong

// a variable that holds the current quote
let current = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Seed with millis() so each page load gives a different quote.
  randomSeed(millis());
  textSize(32);
  fill(10, 255, 10);
  // calls the function to pick a quote
  pickQuote();
}

function pickQuote() {
  // take a random number and use that to identify what quote to use
  current = quotes[floor(random(quotes.length))];
}

function draw() {
  background(255, 20, 250); // set the background color
  drawQuote();  // draw the quote on screen
}

function drawQuote() {   // draw text
  textAlign(CENTER, CENTER);
  text("Creative Coding is.....", width / 2, height / 2 - 48);
  textStyle(BOLD);
  text("'" + current.text + "'", width / 2, height / 2);
  textAlign(RIGHT, CENTER);
  text("-" + current.source, width - 100, height - 100);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  redraw();
}

function mousePressed() {
  newQuote();
}
