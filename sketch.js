let grid;
let skyline;
let cols = 80;
let rows = 60;

function setup() {
  // frameRate(1);
  createCanvas(800, 800);

  grid = new Grid(cols, rows, width, 600, 0.4);
  grid.setStartNode(floor(random(0, cols)), 0);
  grid.setEndNode(floor(random(0, cols)), rows - 1);
  grid.initialise();

  skyline = new Skyline(width, 200);
  skyline.addTallest(grid.endNode.x);
}

function draw() {
  background(13, 13, 23);
  grid.aStarStep();
  grid.render();

  skyline.render();
}