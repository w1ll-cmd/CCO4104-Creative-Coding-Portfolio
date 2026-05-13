// use key Q to change bg colouur, W to add a cirlce and E to change it's colour
let bgColour; // background colour
let circleX;
let cirlceY;
let circleD;
let circleColourA = 0;
let circleColourB = 0;
let circleColourC = 0;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  bgColour = (220); // sets bg colour when key pressed
  // setting defaullt parameters for circle so code works
  circleX = 0;
  circleY = 0;
  circleD = 0;
}

function draw() {
  
   // bg colour changing function
  background(bgColour);
  // changes colour for circle
  fill(circleColourA, circleColourB, circleColourC);
  // draws a randomm circle
  circle(circleX, circleY, circleD);
  
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
  // assigns random values to background colour when 'Q' is pressed
  if (key === 'q' || key === 'Q') {
    bgColour = color(random(255), random(255), random(255));
  // assigns random values to circle when 'W' is pressed
  } else if (key === 'w' || key === 'W') {
    circleX = random(width);
    circleY = random(height);
    circleD = random(10, 100);
  // assigns random values to circle colour when 'W' is pressed
  } else if (key === 'e' || key === 'E') {
    circleColourA = random(0, 255);
    circleColourB = random(0, 255);
    circleColourC = random(0, 255);
    
  }
}