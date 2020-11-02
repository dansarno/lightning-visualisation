let grid;
let skyline;
let showHide = false;
let paused;
let cols = 80;
let rows = 60;
let flashFrame = 0;

function setup() {
  // frameRate(1);
  createCanvas(800, 800);

  grid = new Grid(cols, rows, width, 600, 0.3);
  grid.setStartNode(floor(random(0, cols)), 0);
  grid.setEndNode(floor(random(0, cols)), rows - 1);
  grid.initialise();

  skyline = new Skyline(width, 200);
  skyline.addTallest(grid.endNode.x);
}

function draw() {
  background(13, 13, 23);
  grid.render(showHide);
  skyline.render();
  grid.aStarStep();
}

function flash() {
  if (flashFrame == 0 || flashFrame == 2 || flashFrame == 4) {
    background(255);
  }
  flashFrame++;
}