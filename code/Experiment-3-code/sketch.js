let video;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1); // important for pixel manipulation

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); // hide default HTML video
}

function draw() {
  background(0);

  video.loadPixels();
  loadPixels();

  let distortion = map(mouseX, 0, width, 0, 50); // mouse controls glitch

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      let index = (x + y * width) * 4;

      // Horizontal glitch offset
      let offsetX = int(x + sin(y * 0.05 + frameCount * 0.05) * distortion);
      offsetX = constrain(offsetX, 0, width - 1);

      let offsetIndex = (offsetX + y * width) * 4;

      let r = video.pixels[offsetIndex + 0];
      let g = video.pixels[offsetIndex + 1];
      let b = video.pixels[offsetIndex + 2];

      // subtle time-based color shift
      r = r + sin(frameCount * 0.05) * 20;
      g = g + cos(frameCount * 0.03) * 20;

      pixels[index + 0] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      pixels[index + 3] = 255;
    }
  }

  updatePixels();
}