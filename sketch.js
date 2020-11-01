let grid;
let cols = 25;
let rows = 25;

function setup() {
  createCanvas(600, 600);
  grid = new Grid(cols, rows, width, height);
  grid.setStartNode(0, 0);
  grid.setEndNode(cols - 1, rows - 1);
  grid.initialise();
}

function draw() {
  background(255);
  console.log(frameCount);
  console.log(grid);
  grid.aStarStep();
  grid.render();

}