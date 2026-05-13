// variation 2 creates an ellipse, but uses the mouse Y axis to change the height
let bgColour; // background colour
let X;
let Y;
let D;
let circleColourA = 0;
let circleColourB = 0;
let circleColourC = 0;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  bgColour = (220); // sets bg colour when key pressed
  // setting defaullt parameters for circle so code works
  X = 0;
  Y = 0;
  D = 0;
  C = 0;
}

function draw() {
  
  
  // changes colour for ellipse
  fill(circleColourA, circleColourB, circleColourC);
  // draws a randomm ellipse
  ellipse(X, Y, D, mouseY);
  
  // drawing the keyboard interface
  fill(140,140,140);     // fills with color
  rect(200,350,400,100); // draws main rect
  
  
  fill(60,60,60);        // fills with color
  rect(80,350,100, 70);  // draws smaller rectangles
 
  fill(60,60,60);
  rect(320,350,100, 70);
  
  fill(60,60,60);
  rect(200,350,100, 70);
  
  // drawing letter 'E'
  fill(255,255,255);  // white colour
  text("E", 307, 360); // draws letter
  textSize(40);
  
  // drawing letter 'W'
  fill(255,255,255);  // white colour
  text("W", 180, 360); // draws letter
  textSize(40);
  
  // drawing letter 'Q'
  fill(255,255,255);  // white colour
  text("Q", 60, 360); // draws letter
  textSize(40);
}


function keyPressed() {
  
  if (key === 'q' || key === 'Q') {
    D = random(10, 100);
  
  } else if (key === 'w' || key === 'W') {
    X = random(width);
    Y = random(height);
  
  } else if (key === 'e' || key === 'E') {
    circleColourA = random(0, 255);
    circleColourB = random(0, 255);
    circleColourC = random(0, 255);
    
  }
}