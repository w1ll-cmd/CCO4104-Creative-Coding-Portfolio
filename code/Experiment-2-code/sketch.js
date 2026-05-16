// global variables
var mouseRadius = 50;
var arraySize = 100;
// array for dots
let dotArray = [];
let canvasSize = 500;

function setup() {
  createCanvas(canvasSize, canvasSize); // canvas size
  // startup values for testing
  for (let i = 0; i < arraySize; i++) {
          dot = {
          x: canvasSize / 2,
          y: canvasSize / 2,
          radius: 10,
          deltaX: random(-5,5),
          deltaY: random(-5,5),
          lastCollisionTime: -999,
          dotFillR: 255,
          dotFillG: 255,
          dotFillB: 255,
      }
        dotArray.push(dot);
  }
}


function draw() {
  background(0); // canvas colour (black)
  
  for (let i = 0; i < arraySize; i++) 
  {
      let currentDot = dotArray[i];
    
      let wallCollision = checkForWallCollision(currentDot);

      if (wallCollision == false) 
      {
          mouseCollision = checkForMouseCollision(currentDot);
      
          if (mouseCollision == true) 
          {
              changeSize(currentDot);
              changeColour(currentDot);
          }
      }

      // draws dot and mouse circle
      move(dotArray[i]);
    
      fill(currentDot.dotFillR, currentDot.dotFillG, currentDot.dotFillB);
      circle(currentDot.x, currentDot.y, currentDot.radius);
    
      fill(255,255,255);
      circle(mouseX, mouseY, mouseRadius);
  }
  
}

// function that checks collision with wall
function checkForWallCollision(dot) 
{
    let wallCollision = false;
  
    if (dot.x < 0 || dot.x > width) 
    {
        wallCollision = true;
        dot.deltaX *= -1;
    } 
    else if (dot.y < 0 || dot.y > height) 
    {
        wallCollision = true;
        dot.deltaY *= -1;
    }

    // returns true if collision with wall is true
    return wallCollision;
}


// function that checks collision of dot with mouse circle
function checkForMouseCollision(dot) 
{
  
    let mouseCollision = false;
    
    let currentTime = millis();
    let lastCollisionTime = dot.lastCollisionTime;
    
    if (currentTime - lastCollisionTime > 250) 
    {
        var d = dist(dot.x, dot.y, mouseX, mouseY);

        if (d < dot.radius + mouseRadius-30) 
        {
            mouseCollision = true;
            dot.lastCollisionTime = millis();
        }
    }
  
    if (mouseCollision == true) 
    {
      dot.deltaX *= -1;
      dot.deltaY *= -1;
    }
    return mouseCollision;
}

// function to increment position of dot every frame (velocity)
function move(dot) 
{
  dot.x += dot.deltaX;
  dot.y += dot.deltaY;
}

// change dot colour
function changeColour(dot) 
{
  dot.dotFillR = random(1,255);
  dot.dotFillG = random(1,255);
  dot.dotFillB = random(1,255);
}

// changes size of dots
function changeSize(dot) 
{
  dot.radius = random(5,20)
}


