let grid;
let skyline;
let showHide = false;
let paused;
let cols = 100;
let rows = 75;
let flashFrame = 0;

function setup() {
  // frameRate(1);
  createCanvas(800, 800);

  grid = new Grid(cols, rows, width, 600, 0.4);
  grid.setStartNode(floor(random(0, cols)), 0);
  grid.setEndNode(floor(random(0 + (cols * 0.2), cols - (cols * 0.2))), rows - 1);
  grid.initialise();

  skyline = new Skyline(width, 200);
  skyline.addTallest(grid.endNode.x);
}

function draw() {
  backgroundGradient(color(13, 13, 23), color(255, 255, 255));
  grid.render(showHide);
  skyline.render();
  grid.aStarStep();
}

function backgroundGradient(c1, c2) {
  noFill();
  for (let y = 0; y < height; y++) {
    let interp = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, interp);
    stroke(c);
    line(0, y, width, y);
  }
}

function flash() {
  if (flashFrame == 0 || flashFrame == 2 || flashFrame == 4) {
    background(255);
  }
  flashFrame++;
}