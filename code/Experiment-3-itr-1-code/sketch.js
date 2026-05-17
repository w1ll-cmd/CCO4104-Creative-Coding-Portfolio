let video;
let chars = " .:-=+*#%@"; // from light to dark

let scaleFactor = 8; // bigger = chunkier, faster

function setup() {
  createCanvas(640, 480);
  textFont('monospace');
  textSize(scaleFactor);
  noStroke();

  video = createCapture(VIDEO);
  video.size(width / scaleFactor, height / scaleFactor);
  video.hide();
}

function draw() {
  background(0);

  video.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {

      let i = (x + y * video.width) * 4;

      let r = video.pixels[i];
      let g = video.pixels[i + 1];
      let b = video.pixels[i + 2];

      let brightness = (r + g + b) / 3;

      let charIndex = floor(map(brightness, 0, 255, 0, chars.length));
      let c = chars.charAt(charIndex);

      fill(r, g, b); // coloured text (nice touch)

      text(c, x * scaleFactor, y * scaleFactor);
    }
  }
}