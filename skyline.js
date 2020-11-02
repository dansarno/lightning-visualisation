class Skyline {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.buildings = this.buildSkyline();
  }

  buildSkyline(n) {
    let buildings = [];
    let origin = 0;
    while (origin < this.w) {
      let newBuilding = new Building(origin, this.w, this.h);
      buildings.push(newBuilding);
      origin += newBuilding.w;
    }
    return buildings;
  }

  addTallest(xPosition) {
    let tallestBuilding = new Building(xPosition, this.w, this.h);
    tallestBuilding.x0 -= tallestBuilding.w / 2;
    tallestBuilding.h = this.h;
    this.buildings.push(tallestBuilding);
  }

  render() {
    for (let b of this.buildings) {
      b.show();
    }
  }
}

class Building {
  constructor(x0, envWidth, envHeight, colour = color(59, 59, 59)) {
    this.x0 = x0;
    this.w = random(0.02, 0.1) * envWidth;
    this.h = random(0.2, 0.8) * envHeight;
    this.colour = colour;
  }

  show() {
    stroke(this.colour);
    fill(this.colour);
    rect(this.x0, 800 - this.h, this.w, this.h);
  }
}