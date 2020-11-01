let grid;

function setup() {
  createCanvas(600, 600);
  grid = new Grid(50, 50, width, height);
}

function draw() {
  background(255);
  grid.render();
  console.log(grid);
  noLoop();
}