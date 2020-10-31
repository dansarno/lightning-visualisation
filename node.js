class Grid {
  constructor(cols, rows, w, h) {
    this.cols = cols;
    this.rows = rows;
    this.w = w;
    this.h = h;
    this.nodeArr = this.make_regular_grid();
  }

  make_regular_grid() {
    let grid = new Array(this.cols);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(this.rows);
      for (var j = 0; j < grid[i].length; j++) {
        grid[i][j] = new Node(i, j, this.w / this.cols, this.h / this.rows);
      }
    }
    return grid;
  }
}

class Node {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.weight = 0;
  }

  show() {

  }

}