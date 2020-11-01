class Grid {
  constructor(cols, rows, w, h) {
    this.cols = cols;
    this.rows = rows;
    this.w = w;
    this.h = h;
    this.nodeArr = this.make_regular_grid(0.3);
  }

  make_regular_grid(chance_of_wall_node) {
    let grid = new Array(this.cols);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(this.rows);
      for (let j = 0; j < grid[i].length; j++) {
        let nodeWidth = this.w / this.cols;
        let nodeHeight = this.h / this.rows;
        if (random() < chance_of_wall_node) {
          grid[i][j] = new Node(i * nodeWidth + nodeWidth / 2, j * nodeHeight + nodeHeight / 2,
            nodeWidth, nodeHeight, 1);
        } else {
          grid[i][j] = new Node(i * nodeWidth + nodeWidth / 2, j * nodeHeight + nodeHeight / 2,
            nodeWidth, nodeHeight, 0);
        }
      }
    }
    return grid;
  }

  render() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.nodeArr[i][j].show();
      }
    }
  }
}

class Node {
  constructor(x, y, width, height, weight = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.weight = weight;
  }

  show() {
    noStroke();
    ellipseMode(CENTER);
    if (this.weight == 0) {
      fill(255);
    } else {
      fill(1);
    }
    ellipse(this.x, this.y, this.width, this.height);
  }

}