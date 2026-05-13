let video;
let mode = 1;
let frozenFrame = null;
let isFrozen = false;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

function draw() {
  background(0);

  if (!isFrozen) {
    video.loadPixels();
  }

  loadPixels();

  let distortion = map(mouseX, 0, width, 0, 60);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      let index = (x + y * width) * 4;

      // Horizontal + vertical glitch
      let offsetX = int(x + sin(y * 0.05 + frameCount * 0.05) * distortion);
      let offsetY = int(y + cos(x * 0.05 + frameCount * 0.05) * distortion * 0.5);

      offsetX = constrain(offsetX, 0, width - 1);
      offsetY = constrain(offsetY, 0, height - 1);

      let offsetIndex = (offsetX + offsetY * width) * 4;

      let sourcePixels = isFrozen ? frozenFrame : video.pixels;

      let r = sourcePixels[offsetIndex + 0];
      let g = sourcePixels[offsetIndex + 1];
      let b = sourcePixels[offsetIndex + 2];

      // ===== MODES =====

      if (mode === 2) {
        // RGB split
        let rOffset = (constrain(offsetX + 10, 0, width - 1) + offsetY * width) * 4;
        let bOffset = (constrain(offsetX - 10, 0, width - 1) + offsetY * width) * 4;

        r = sourcePixels[rOffset];
        b = sourcePixels[bOffset + 2];
      }

      else if (mode === 3) {
        // Invert
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
      }

      else if (mode === 4) {
        // Threshold
        let avg = (r + g + b) / 3;
        let val = avg > 127 ? 255 : 0;
        r = g = b = val;
      }

      // subtle animation (still applied to all modes)
      r += sin(frameCount * 0.05) * 15;
      g += cos(frameCount * 0.04) * 15;

      pixels[index + 0] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      pixels[index + 3] = 255;
    }
  }

  updatePixels();

  // UI text
  fill(255);
  textSize(14);
  text("Mode: " + mode + " | Press 1-4 to change | F to freeze", 10, 20);
}

function keyPressed() {
  if (key === '1') mode = 1;
  if (key === '2') mode = 2;
  if (key === '3') mode = 3;
  if (key === '4') mode = 4;

  if (key === 'f' || key === 'F') {
    isFrozen = !isFrozen;

    if (isFrozen) {
      frozenFrame = video.pixels.slice(); // store current frame
    }
  }
}