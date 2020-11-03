class Grid {
  constructor(cols, rows, w, h, probWall) {
    this.cols = cols;
    this.rows = rows;
    this.w = w;
    this.h = h;
    this.nodeArr = this.make_regular_grid(probWall);
    this.startNode = null;
    this.endNode = null;
    this.openSet = new MinHeap();
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
            nodeWidth, nodeHeight, true);
        } else { // Create regular node
          grid[i][j] = new Node(i * nodeWidth + nodeWidth / 2,
            j * nodeHeight + nodeHeight / 2,
            i, j,
            nodeWidth, nodeHeight);
        }
      }
    }
    return grid;
  }

  connectGrid() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let node = this.nodeArr[i][j];
        // E, W, S, N connections
        if (i < this.cols - 1) {
          node.neighbours.push(this.nodeArr[i + 1][j]);
        }
        if (i > 0) {
          node.neighbours.push(this.nodeArr[i - 1][j]);
        }
        if (j < this.rows - 1) {
          node.neighbours.push(this.nodeArr[i][j + 1]);
        }
        if (j > 0) {
          node.neighbours.push(this.nodeArr[i][j - 1]);
        }
        // NW, connections
        if (i > 0 && j > 0) {
          node.neighbours.push(this.nodeArr[i - 1][j - 1]);
        }
        if (i < this.cols - 1 && j > 0) {
          node.neighbours.push(this.nodeArr[i + 1][j - 1]);
        }
        if (i > 0 && j < this.rows - 1) {
          node.neighbours.push(this.nodeArr[i - 1][j + 1]);
        }
        if (i < this.cols - 1 && j < this.rows - 1) {
          node.neighbours.push(this.nodeArr[i + 1][j + 1]);
        }
      }
    }
  }

  initialise() {
    this.startNode.g = 0;
    this.startNode.h = this.calcHeuristic(this.startNode, this.endNode);
    this.startNode.f = this.startNode.h;
  }

  render(showHide) {
    this.renderGrid(showHide);
    this.renderPath();
  }

  renderGrid(showHide) {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.nodeArr[i][j].show(showHide);
      }
    }
  }

  renderPath() {
    noFill();
    stroke(255, 255, 0);
    strokeWeight(5);
    strokeJoin(ROUND);
    strokeCap(PROJECT);
    beginShape();
    for (let el of this.path) {
      vertex(el.x, el.y);
    }
    endShape();
    stroke(255, 255, 255);
    strokeWeight(3);
    beginShape();
    for (let el of this.path) {
      vertex(el.x, el.y);
    }
    endShape();
  }

  setStartNode(i, j) {
    this.startNode = this.nodeArr[i][j];
    this.addToOpenSet(this.startNode);
    this.startNode.wall = false;
  }

  setEndNode(i, j) {
    this.endNode = this.nodeArr[i][j];
    this.endNode.wall = false;
  }

  addToOpenSet(node) {
    // this.openSet.push(node);
    this.openSet.add([node, node.f]);
    node.isInOpen = true;
  }

  // removeFromOpenSet(node) {
  //   for (let i = this.openSet.length - 1; i >= 0; i--) {
  //     if (this.openSet[i] == node) {
  //       this.openSet.splice(i, 1);
  //     }
  //   }
  // }

  addToClosedSet(node) {
    this.closedSet.push(node);
    node.isInOpen = false;
    node.isInClosed = true;
    this.openSet.poll(node);
  }

  calcHeuristic(node_a, node_b) {
    return dist(node_a.i, node_a.j, node_b.i, node_b.j);
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
    if (this.openSet.size > 0) {
      // Continue
      let current = this.openSet.peek();
      if (current[0] === this.endNode) {
        // DONE!!!
        flash();
      } else {
        this.addToClosedSet(current[0]);

        for (let neighbour of current[0].neighbours) {
          // let tempG = current.g + this.calcHeuristic(neighbour, current);
          let tempG = current[0].g + 1;
          if (tempG < neighbour.g) {
            neighbour.h = this.calcHeuristic(neighbour, this.endNode);
            neighbour.g = tempG;
            neighbour.f = neighbour.g + neighbour.h;
            neighbour.cameFrom = current[0];
            if (!this.openSet.items.includes(neighbour) && !neighbour.wall) {
              this.addToOpenSet(neighbour);
            }
          }
        }
      }
      this.tracePath(current[0]);
    } else {
      // Stop
      noLoop();
    }
  }

  // getBestNode() {
  //   let bestNode = this.openSet[0]
  //   for (let node of this.openSet) {
  //     if (node.f < bestNode.f) {
  //       bestNode = node
  //     }
  //   }
  //   return bestNode;
  // }
}

class Node {
  constructor(x, y, i, j, width, height, wall = false) {
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
    this.wall = wall;
    this.isInOpen = false;
    this.isInClosed = false;
  }

  show(showHide) {
    noStroke();
    if (this.wall && showHide) {
      fill(255);
      circle(this.x, this.y, min(this.width, this.height));
    }
    // else {
    //   fill(13, 13, 23);
    //   ellipse(this.x, this.y, this.width, this.height);
    // }

    // rectMode(CENTER);
    // if (this.isInOpen || this.isInClosed) {
    //   fill(51, 52, 105);
    //   rect(this.x, this.y, this.width, this.height);
    // }

    rectMode(CENTER);
    if (this.isInOpen && showHide) {
      fill(145, 230, 147);
      rect(this.x, this.y, this.width, this.height);
    } else if (this.isInClosed && showHide) {
      fill(237, 104, 104);
      rect(this.x, this.y, this.width, this.height);
    }
  }

}