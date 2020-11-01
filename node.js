class Grid {
  constructor(cols, rows, w, h) {
    this.cols = cols;
    this.rows = rows;
    this.w = w;
    this.h = h;
    this.nodeArr = this.make_regular_grid(0.3);
    this.startNode = null;
    this.endNode = null;
    this.openSet = [];
    this.closedSet = [];
    this.path = [];

    this.connectGrid();
  }

  make_regular_grid(chance_of_wall_node) {
    let grid = new Array(this.cols);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(this.rows);
      for (let j = 0; j < grid[i].length; j++) {
        let nodeWidth = this.w / this.cols;
        let nodeHeight = this.h / this.rows;
        // Create wall node
        if (random() < chance_of_wall_node) {
          grid[i][j] = new Node(i * nodeWidth + nodeWidth / 2,
            j * nodeHeight + nodeHeight / 2,
            i, j,
            nodeWidth, nodeHeight, 1);
        } else { // Create regular node
          grid[i][j] = new Node(i * nodeWidth + nodeWidth / 2,
            j * nodeHeight + nodeHeight / 2,
            i, j,
            nodeWidth, nodeHeight, 0);
        }
      }
    }
    return grid;
  }

  connectGrid() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let node = this.nodeArr[i][j];
        if (i < this.cols - 1) {
          node.neighbours.push(this.nodeArr[i + 1][j]);
        }
        if (i > 0) {
          node.neighbours.push(this.nodeArr[i - 1][j]);
        }
        if (j < this.cols - 1) {
          node.neighbours.push(this.nodeArr[i][j + 1]);
        }
        if (j > 0) {
          node.neighbours.push(this.nodeArr[i][j - 1]);
        }
      }
    }
  }

  initialise() {
    this.startNode.g = 0;
    this.startNode.h = this.calcHeuristic(this.startNode);
    this.startNode.f = this.startNode.h;
  }

  render() {
    this.renderGrid();
    this.renderPath();
  }

  renderGrid() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.nodeArr[i][j].show();
      }
    }
  }

  renderPath() {
    for (let el of this.path) {
      el.show(color(0, 69, 255));
    }
  }

  setStartNode(i, j) {
    this.weight = 0;
    this.startNode = this.nodeArr[i][j];
    this.addToOpenSet(this.startNode);
  }

  setEndNode(i, j) {
    this.weight = 0;
    this.endNode = this.nodeArr[i][j];
  }

  addToOpenSet(node) {
    this.openSet.push(node);
    node.isInOpen = true;
  }

  removeFromOpenSet(node) {
    for (let i = this.openSet.length - 1; i >= 0; i--) {
      if (this.openSet[i] == node) {
        this.openSet.splice(i, 1);
      }
    }
  }

  addToClosedSet(node) {
    this.closedSet.push(node);
    node.isInOpen = false;
    node.isInClosed = true;
    this.removeFromOpenSet(node);
  }

  calcHeuristic(node, type = "euclidian") {
    if (type == "euclidian") {
      return dist(node.i, node.j, this.endNode.i, this.endNode.j);
    } else if (type == "manhattan") {
      return abs(node.i - this.endNode.i) + abs(node.j - this.endNode.j);
    } else {
      console.log("Invalid heuristic type");
      noLoop();
    }
  }

  tracePath(node) {
    this.path = [];
    let currentEnd = node;
    this.path.push(currentEnd);
    while (currentEnd.cameFrom) {
      this.path.push(currentEnd.cameFrom);
      currentEnd = currentEnd.cameFrom;
    }
  }

  aStarStep() {
    if (this.openSet.length > 0) {
      // Continue
      let current = this.getBestNode();
      this.tracePath(current);
      if (current === this.endNode) {
        console.log("DONE");
        noLoop();
      }
      this.addToClosedSet(current);
      for (let neighbour of current.neighbours) {
        let tempG = current.g + 1;
        if (tempG < neighbour.g) {
          neighbour.h = this.calcHeuristic(neighbour);
          neighbour.g = tempG;
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.cameFrom = current;
          if (!this.openSet.includes(neighbour)) {
            this.addToOpenSet(neighbour);
          }
        }
      }
    } else {
      noLoop();
      // Stop
    }
  }

  getBestNode() {
    let bestNode = this.openSet[0]
    for (let node of this.openSet) {
      if (node.f < bestNode.f) {
        bestNode = node
      }
    }
    return bestNode;
  }
}

class Node {
  constructor(x, y, i, j, width, height, weight = 0) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    this.width = width;
    this.height = height;
    this.neighbours = [];
    this.cameFrom = null;
    this.f = Infinity;
    this.g = Infinity;
    this.h = 0;
    this.weight = weight;
    this.isInOpen = false;
    this.isInClosed = false;
    this.isInPath = false;
  }

  show(c = null) {
    noStroke();
    rectMode(CENTER);
    if (c) {
      fill(c);
    } else {
      if (this.weight == 0) {
        fill(255);
      } else {
        fill(1);
      }

      if (this.isInOpen) {
        fill(145, 230, 147);
      } else if (this.isInClosed) {
        fill(237, 104, 104);
      }
    }
    rect(this.x, this.y, this.width, this.height);
  }

}