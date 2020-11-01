function setup() {
  createCanvas(600, 600);
  noStroke();
  fill(20, 64, 190);
}

function draw() {
  background(255);
  let grid = new Grid(50, 50, width, height);
  grid.render();
  console.log(grid);
  noLoop();
}