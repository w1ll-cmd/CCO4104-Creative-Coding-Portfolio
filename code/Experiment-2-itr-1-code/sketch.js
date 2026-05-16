// global variables
var mouseRadius = 50;
var arraySize = 0;
// array for dots
let dotArray = [];
let canvasSize = 500;
let maxArraySize = 200;

function setup() {
  createCanvas(canvasSize, canvasSize); // canvas size
  createDot(canvasSize / 2, canvasSize / 2);
}
// creates dot object
function createDot(x, y)
{
  
  dot = {
          x: x,
          y: y,
          radius: 10,
          deltaX: random(-5,5),
          deltaY: random(-5,5),
          lastCollisionTime: millis(),
          dotFillR: random(10,255),
          dotFillG: random(10,255),
          dotFillB: random(10,255),
        }
  dotArray.push(dot);
  
  // stops dots from spawning if max array size is reached
  if (arraySize < maxArraySize) 
  {
    arraySize += 1;
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
            
              if (keyIsDown(SHIFT)) 
              {
                createDot(currentDot.x, currentDot.y);
              }
              else if (keyIsDown(CONTROL)) 
              {
                removeDot(i);
                arraySize -= 1;
                break;
              }
            
              
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

// changes colour of dots
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

function removeDot(index) 
{
  dotArray.splice(index, 1);
}

