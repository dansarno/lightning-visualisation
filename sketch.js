let grid;
let cols = 50;
let rows = 50;

function setup() {
  // frameRate(1);
  createCanvas(800, 800);
  grid = new Grid(cols, rows, width, height, 0.4);
  grid.setStartNode(floor(random(0, cols)), 0);
  grid.setEndNode(floor(random(0, cols)), rows - 1);
  grid.initialise();
}

function draw() {
  background(255);
  console.log(frameCount);
  console.log(grid);
  grid.aStarStep();
  grid.render();
}