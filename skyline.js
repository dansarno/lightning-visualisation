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
    let tallestBuilding = new Skyscraper(xPosition, this.w, this.h);
    this.buildings.push(tallestBuilding);
  }

  render() {
    for (let b of this.buildings) {
      b.show();
    }
  }
}

class Building {
  constructor(x0, envWidth, envHeight, colour = color(31, 31, 31)) {
    this.x0 = x0;
    this.w = random(0.02, 0.1) * envWidth;
    this.h = random(0.2, 0.6) * envHeight;
    this.colour = colour;
    this.windows = new Windows(this.x0, this.w, this.h, random(0.05, 0.1));
  }

  show() {
    stroke(this.colour);
    fill(this.colour);
    rectMode(CORNER);
    rect(this.x0, 800 - this.h, this.w, this.h);

    // this.windows.show();
  }
}

class Skyscraper extends Building {
  constructor(x0, envWidth, envHeight, colour = color(31, 31, 31)) {
    super(x0, envWidth, envHeight, colour = color(31, 31, 31));
    //Update two attributes...
    this.x0 -= this.w / 2;
    this.h = 0.85 * envHeight;
    this.windows = new Windows(this.x0, this.w, this.h, random(0.05, 0.1));
  }

  show() {
    super.show();
    //Show spire...
    noStroke();
    fill(this.colour);
    rectMode(CORNER);
    rect(this.x0 + this.w / 2 - 5, 595, 7, 50);
  }
}

class Windows {
  constructor(x0, buildingWidth, buildingHeight, probLightOn) {
    this.x0 = x0;
    this.buildingWidth = buildingWidth;
    this.buildingHeight = buildingHeight;
    this.probLightOn = probLightOn;
    this.windows = [];

    this.createWindows();
  }

  createWindows() {
    for (let i = this.x0; i < this.buildingWidth + this.x0; i += 5) {
      for (let j = 800 - (this.buildingHeight * 0.9); j < 800; j += 5) {
        this.windows.push(new Window(this.probLightOn, i, j));
      }
    }
  }

  show() {
    for (let window of this.windows) {
      if (window.hasLightOn) {
        noStroke();
        fill(255, 251, 230);
        square(window.x, window.y, 2);
      }
    }
  }
}

class Window {
  constructor(probLightOn, x, y) {
    this.hasLightOn = random() < probLightOn;
    this.x = x;
    this.y = y;
  }
}