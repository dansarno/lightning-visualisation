function setup() {
  createCanvas(600, 400);
  noStroke();
  fill(20, 64, 190);
}

function draw() {
  background(200);
  ellipse(50, 50, 10);
  let grid = new Grid(10, 5, 400, 200);
  console.log(grid);
  noLoop();
}