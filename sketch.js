let grid;
let cols = 80;
let rows = 60;

function setup() {
  // frameRate(1);
  createCanvas(800, 800);
  grid = new Grid(cols, rows, width, 600, 0.4);
  grid.setStartNode(floor(random(0, cols)), 0);
  grid.setEndNode(floor(random(0, cols)), rows - 1);
  grid.initialise();
}

function draw() {
  background(0);
  console.log(frameCount);
  console.log(grid);
  grid.aStarStep();
  grid.render();
}